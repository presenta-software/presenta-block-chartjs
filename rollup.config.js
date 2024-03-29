import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-polyfill-node'

import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { terser } from 'rollup-plugin-minification'


export default {
  input: 'src/index.js',
  output: {
    file: 'dist/presenta-block-chartjs.min.js',
    format: 'umd',
    name: 'PresentaBlockChartjs',
    sourcemap: false
  },
  watch: {
    exclude: 'dist/*',
    include: 'src/**'
  },
  plugins: [
    nodePolyfills(),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser(),
    commonjs(),
    postcss({
      modules: {
        globalModulePaths: [
          /global/
        ]
      },
      autoModules: false,
      plugins: [
        autoprefixer({ grid: true }),
        cssnano({ preset: 'default' })
      ]
    })
  ]
  // external: ['moment']
}
