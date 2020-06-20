# <em>µ</em>land

micro-land, is a [µhtml](https://github.com/WebReflection/uhtml#readme) take at [neverland](https://github.com/WebReflection/neverland/#readme).

Same API, except the exports are `{Component, render, html, svg}`, where `Component` is a function you can use either as `new Component(...)` or just `Component(...)` which is the equivalent of _neverland_ default export.


## API

The concept is exactly the same as the _neverland_ one, so please go there to know more about this module usage.


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
