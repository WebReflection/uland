# 🦄 <em>µ</em>land

![tiny island](./uland-head.jpg)

<sup>**Social Media Photo by [Ben Klea](https://unsplash.com/@benkleaphoto) on [Unsplash](https://unsplash.com/)**</sup>

*micro* land, or *unicorn* land, is a [µhtml](https://github.com/WebReflection/uhtml#readme) take at [neverland](https://github.com/WebReflection/neverland/#readme).


### 📣 Community Announcement

Please ask questions in the [dedicated forum](https://webreflection.boards.net/) to help the community around this project grow ♥

---

Same API, except the exports are `{Component, render, html, svg}`, where `Component` is a function you can use either as `new Component(...)` or just `Component(...)` which is the equivalent of _neverland_ default export.

### Announcement

Are you looking for something even more similar to *React*? Then don't miss [🐪 kaboobie](https://github.com/WebReflection/kaboobie/#readme) out!


## API

The concept is exactly the same as the _neverland_ one, the `render(...)` accepts a node to render, and either a *component* or a *callback* that returns some content.

[Live demo](https://codepen.io/WebReflection/pen/dyGvNdg?editors=0010).

```js
import {Component, render, html, useState} from 'uland';

const Counter = Component((initialState) => {
  const [count, setCount] = useState(initialState);
  return html`
  <button onclick=${() => setCount(count + 1)}>
    Count: ${count}
  </button>`;
});

// basic example, show two independent counters
render(document.body, () => html`
  <div>
    A bounce of counters.<hr>
    ${Counter(0)} ${Counter(1)}
  </div>
`);
```

Please [check neverland](https://github.com/WebReflection/neverland/#concept) to know more about this module usage.
