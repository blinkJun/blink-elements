import jsonPlugin from "@rollup/plugin-json";
import vuePlugin from "rollup-plugin-vue";
import cssPlugin from "rollup-plugin-css-only";
import tsPlugin from "rollup-plugin-typescript2";
import { dependencies } from "../package.json";
export const name = "blink-elements";
export const file = (type) => `dist/${name}.${type}.js`;
const deps = Object.keys(dependencies);
export default {
  input: "index.ts",
  output: {
    file: "../dist/bundle.js",
    format: "es",
  },
  plugins: [
    tsPlugin({
      tsconfigOverride: {
        declaration: true,
      },
    }),
    vuePlugin(),
    cssPlugin({
      output: "bundle.css",
    }),
    jsonPlugin(),
  ],
  external: (id) => {
    return /^vue/.test(id) || deps.some((k) => new RegExp(`^${k}`).test(id));
  },
};
