import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./docs/vue2/index.js",
  output: {
    name: "Vue",
    file: './docs/vue/dist/umd/vue.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [resolve(), babel({ babelHelpers: 'bundled', exclude: ["node_modules/**"] }), commonjs()]
}