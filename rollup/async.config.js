import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';
export default {
  input: './esm/async.js',
  plugins: [
    includePaths({
      include: {
        '@ungap/custom-event': 'node_modules/uhooks-dom/esm/custom-event.js',
        '@webreflection/lie': 'node_modules/uhooks/esm/promise.js'
      }
    }),
    nodeResolve(),
    terser()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    exports: 'named',
    file: './async.js',
    format: 'iife',
    name: 'uland'
  }
};
