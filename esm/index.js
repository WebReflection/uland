import {hooked} from 'uhooks-dom';
import umap from 'umap';
import {isArray} from 'uarray';

import {
  Hole,
  html as $html,
  svg as $svg,
  render as $render
} from 'uhtml';

const {create} = Object;

const html = (template, ...values) => new Hole('html', template, values);
html.for = createFor($html);

const svg = (template, ...values) => new Hole('svg', template, values);
svg.for = createFor($svg);

const cache = umap(new WeakMap);

const render = (where, what) => (
  cache.get(where) || cache.set(where, {
    c: createCache(),
    h: hooked(
      /*async*/ function (what) {
        const value = /*await*/ (typeof what === 'function' ? what() : what);
        return $render(
          where,
          value instanceof Hook ?
            /*await*/ unroll(this.c, value) :
            (/*await*/ unrollHole(this.c, value), value)
        );
      },
      where
    )
  })
).h(what);

export {Component, render, html, svg};

export {
  createContext, useContext,
  useCallback, useMemo,
  useEffect, useLayoutEffect,
  useReducer, useState, useRef
} from 'uhooks-dom';

const createHook = (info, entry) => hooked(/*async*/ function () {
  const hole = /*await*/ entry.f.apply(this, arguments);
  if (hole instanceof Hole) {
    /*await*/ unrollHole(info, hole);
    entry.$ = view(entry, hole);
  }
  else
    entry.$ = hole;
  return entry.$;
});

const createCache = () => ({s: [], e: null});

const unroll = (info, {f, c, a}) => {
  let {e} = info;
  if (!e || e.f !== f) {
    info.e = (e = {f, h: null, $: null});
    e.h = createHook(createCache(), e);
  }
  return e.h.apply(c, a);
};

const unrollHole = /*async*/ (info, {values}) => {
  /*await*/ unrollValues(info, values, values.length);
};

const unrollValues = /*async*/ (info, values, length) => {
  const {s} = info;
  for (let i = 0; i < length; i++) {
    const hook = /*await*/ values[i];
    if (hook instanceof Hook)
      values[i] = /*await*/ unroll(s[i] || (s[i] = createCache()), hook);
    else if (hook instanceof Hole)
      /*await*/ unrollHole(s[i] || (s[i] = createCache()), hook);
    else if (isArray(hook))
      /*await*/ unrollValues(s[i] || (s[i] = createCache()), hook, hook.length);
    else
      s[i] = null;
  }
  if (length < s.length)
    s.splice(length);
};

const view = (e, {type, template, values}) =>
              (type === 'svg' ? $svg : $html)
                .for(e, type)(template, ...values);

function Component(f) {
  return function () {
    return new Hook(f, this, arguments);
  };
}

function Hook(f, c, a) {
  this.f = f;
  this.c = c;
  this.a = a;
}

function createFor(uhtml) {
  const cache = umap(new WeakMap);
  return (
    (e, id) => {
      const store = cache.get(e) || cache.set(e, create(null));
      const info = store[id] || (store[id] = createCache());
      return /*async*/ (template, ...values) => {
        /*await*/ unrollValues(info, values);
        return uhtml.for(e, id)(template, ...values);
      };
    }
  );
}
