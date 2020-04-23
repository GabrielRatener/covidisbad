
import commonJS from "rollup-plugin-commonjs"
import coffee from "rollup-plugin-coffee-script"

export default {
  input: 'src/main.js',

  plugins: [
    commonJS(),
    coffee()
  ],

  output: {
    file: 'public/dist/main.js',
    format: 'iife',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'recharts': 'Recharts'
    }
  },

  watch: {
    exclude: 'node_modules/**',
    include: [
      './src/**/*.js',
      './src/**/*.coffee'
    ]
  }
}
