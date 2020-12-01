import {augmentor} from 'dom-augmentor';
import umap from 'umap';

import {
  Hole,
  html as $html,
  svg as $svg,
  render as $render
} from 'uhtml';

const {isArray} = Array;
const {create} = Object;

const html = (template, ...values) => new Hole('html', template, values);
html.for = createFor($html);

const svg = (template, ...values) => new Hole('svg', template, values);
svg.for = createFor($svg);

const cache = umap(new WeakMap);
const render = (where, what) => {
  const hook = typeof what === 'function' ? what() : what;
  const info = cache.get(where) || cache.set(where, createCache(null));
  info.w = where;
  info.W = what;
  return $render(
    where,
    hook instanceof Hook ?
      unroll(info, hook) :
      (unrollHole(info, hook), hook)
  );
};

export {Component, render, html, svg};

export {
  contextual,
  useState,
  useEffect,
  useContext, createContext,
  useRef,
  useReducer,
  useCallback,
  useMemo,
  useLayoutEffect
} from 'dom-augmentor';

let update = false;
const updateEntry = (entry, node, isHole) => {
  const curr = entry.node;
  if (node !== curr) {
    if (curr) {
      update = true;
      if (isHole) {
        // TODO: fix wired fragments too
        const {parentNode} = curr;
        if (parentNode)
          parentNode.replaceChild(node, curr);
      }
    }
    entry.node = node;
  }
};

const createHook = (info, entry) => augmentor(function () {
  const hole = entry.fn.apply(null, arguments);
  if (hole instanceof Hole) {
    unrollHole(info, hole);
    updateEntry(entry, view(entry, hole), true);
  }
  else
    updateEntry(entry, hole, false);
  try { return entry.node; }
  finally {
    if (update) {
      update = false;
      let p = info;
      while (p.p)
        p = p.p;
      render(p.w, p.W);
    }
  }
});

const createCache = p => ({p, stack: [], entry: null});

const unroll = (info, {fn, template, values}) => {
  let {entry} = info;
  if (!entry || entry.fn !== fn) {
    info.entry = (entry = {fn, hook: null, node: null});
    entry.hook = createHook(createCache(info), entry);
  }
  return entry.hook(template, ...values);
};

const unrollHole = (info, {values}) => {
  unrollValues(info, values, values.length);
};

const unrollValues = (info, values, length) => {
  const {stack} = info;
  for (let i = 0; i < length; i++) {
    const hook = values[i];
    if (hook instanceof Hook)
      values[i] = unroll(stack[i] || (stack[i] = createCache(info)), hook);
    else if (hook instanceof Hole)
      unrollHole(stack[i] || (stack[i] = createCache(info)), hook);
    else if (isArray(hook))
      unrollValues(stack[i] || (stack[i] = createCache(info)), hook, hook.length);
    else
      stack[i] = null;
  }
  if (length < stack.length)
    stack.splice(length);
};

const view = (entry, {type, template, values}) =>
              (type === 'svg' ? $svg : $html)
                .for(entry, type)(template, ...values);

function Component(fn) {
  return (template, ...values) => new Hook(fn, template, values);
}

function Hook(fn, template, values) {
  this.fn = fn;
  this.template = template;
  this.values = values;
}

function createFor(uhtml) {
  const cache = umap(new WeakMap);
  return (
    (entry, id) => {
      const store = cache.get(entry) || cache.set(entry, create(null));
      const info = store[id] || (store[id] = createCache(null));
      return (template, ...values) => {
        unrollValues(info, values);
        return uhtml.for(entry, id)(template, ...values);
      };
    }
  );
}
