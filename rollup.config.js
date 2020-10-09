import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const terser = require('rollup-plugin-terser').terser

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
    resolve(),
    babel({
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
      plugins: [
        autoprefixer({ grid: true }),
        cssnano({ preset: 'default' })
      ]
    })
  ],
  external: ['moment']
}
