
import resolve from "rollup-plugin-node-resolve"
import commonJS from "rollup-plugin-commonjs"
import coffee from "rollup-plugin-coffee-script"

import replace from "rollup-plugin-replace"

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-is': 'ReactIs',
  'prop-types': 'PropTypes',
  'recharts': 'Recharts'
}

export default {
  input: 'src/main.js',

  external: Object.keys(globals),

  plugins: [
    replace({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    coffee(),
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
  ],

  output: {
    file: 'public/dist/main.js',
    format: 'iife',
    globals
  },

  watch: {
    exclude: 'node_modules/**',
    include: [
      './src/**/*.js',
      './src/**/*.coffee'
    ]
  }
}
