import registry from './registry.mjs';

const {Component, html, useState} = registry.get('@uland');

export default Component(initialState => {
  const [count, setCount] = useState(initialState);
  return html`
  <button onclick=${() => setCount(count + 1)}>
    Count: ${count}
  </button>`;
});
