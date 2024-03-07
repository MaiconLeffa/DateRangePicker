import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

const config = {
  input: "./index.tsx",
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
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js"
      },
      extensions: [".css"],
      inject: {
        insertAt: "top"
      }
    }),
    typescript({
      clean: true,
      tsconfig: "tsconfig-rollup.json",
      typescript: require("typescript")
    })
  ]
};

export default config;