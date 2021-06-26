import {hooked} from 'uhooks-dom/async';
import umap from 'umap';
import {isArray} from 'uarray';

import {
  Hole,
  html as $html,
  svg as $svg,
  render as $render
} from 'uhtml';

const {create} = Object;

const cache = umap(new WeakMap);

const createTag = kind => {
  const tag = async (template, ...values) => {
    const info = cache.get(template) || cache.set(template, createCache());
    await unrollValues(info, values);
    return kind(template, ...values);
  };
  tag.for = createFor(kind);
  return tag;
};

const html = createTag($html);
const svg = createTag($svg);

const render = (where, what) => (
  cache.get(where) || cache.set(where, {
    c: createCache(),
    h: hooked(
      async function (what) {
        const value = await (typeof what === 'function' ? what() : what);
        return $render(
          where,
          value instanceof Hook ?
            await unroll(this.c, value) :
            (await unrollValues(this.c, value.values), value)
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
} from 'uhooks-dom/async';

const createHook = entry => hooked(async function () {
  const hole = await entry.f.apply(this, arguments);
  return (entry.$ = hole instanceof Hole ? view(entry, hole) : hole);
});

const createCache = () => ({s: [], e: null});

const unroll = (info, {f, c, a}) => {
  let {e} = info;
  if (!e || e.f !== f) {
    info.e = (e = {f, h: null, $: null});
    e.h = createHook(e);
  }
  return e.h.apply(c, a);
};

const unrollValues = async (info, values) => {
  const {s} = info, {length} = values;
  for (let i = 0; i < length; i++) {
    const hook = await values[i];
    if (hook instanceof Hook)
      values[i] = await unroll(s[i] || (s[i] = createCache()), hook);
    else if (isArray(hook))
      await unrollValues(s[i] || (s[i] = createCache()), hook);
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
      return async (template, ...values) => {
        await unrollValues(info, values);
        return uhtml.for(e, id)(template, ...values);
      };
    }
  );
}
