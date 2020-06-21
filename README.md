# <em>µ</em>land

![tiny island](./uland-head.jpg)

<sup>**Social Media Photo by [Ben Klea](https://unsplash.com/@benkleaphoto) on [Unsplash](https://unsplash.com/)**</sup>

*micro* land, is a [µhtml](https://github.com/WebReflection/uhtml#readme) take at [neverland](https://github.com/WebReflection/neverland/#readme).

Same API, except the exports are `{Component, render, html, svg}`, where `Component` is a function you can use either as `new Component(...)` or just `Component(...)` which is the equivalent of _neverland_ default export.


## API

The concept is exactly the same as the _neverland_ one.

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
render(document.body, html`
  <div>
    A bounce of counters.<hr>
    ${Counter(0)} ${Counter(1)}
  </div>
`);
```

Please [check neverland](https://github.com/WebReflection/neverland/#concept) to know more about this module usage.


## Differences

**Technically** speaking, just the following one:

```js
// neverland
import {neverland, render, html, useState} from 'neverland';

// uland
import {Component, render, html, useState} from 'uland';
```

The component is a function you can invoke ether via `new Component` or just `Component`, as it doesn't matter how you invoke it, it'll return a usable component.


**Practically** speaking, this module size is *~5K* all inclusive, as opposite of *~7.5K*.
