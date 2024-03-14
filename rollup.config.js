import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";
import tailwindcss from "tailwindcss";
const tailwindConfig = require("./tailwind.config.js");

const config = {
  input: "./index.tsx",
  treeshake: true,
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    'tailwindcss/tailwind.css',
    ...Object.keys(pkg.devDependencies || {}),
  ],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js"
      },
      extensions: [".css"],
      inject: {
        insertAt: "top"
      },
      plugins: [tailwindcss(tailwindConfig)]
    }),
    typescript({
      clean: true,
      tsconfig: "tsconfig-rollup.json",
      typescript: require("typescript")
    })
  ]
};

export default config;
