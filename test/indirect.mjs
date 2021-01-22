// bootstrap registry and libraries
import registry from './registry.mjs';
import * as uland from 'uland-ssr';
registry.set('@uland', uland);

const {render, html} = uland;

const {default: Counter} = await import('./counter.mjs');

render(console.log, () => html`
  <div>
    A bounce of counters.<hr>
    ${Counter(0)} ${Counter(1)}
  </div>
`);
