import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';
export default {
  input: './esm/index.js',
  plugins: [
    includePaths({
      include: {
        '@ungap/custom-event': 'node_modules/uhooks-dom/esm/custom-event.js',
        '@webreflection/lie': 'node_modules/uhooks/esm/promise.js'
      }
    }),
    resolve({module: true}),
    terser()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    exports: 'named',
    file: './es.js',
    format: 'iife',
    name: 'uland'
  }
};
