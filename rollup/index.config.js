import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: './esm/index.js',
  plugins: [
    nodeResolve()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    esModule: false,
    exports: 'named',
    file: './index.js',
    format: 'iife',
    name: 'uland'
  }
};
