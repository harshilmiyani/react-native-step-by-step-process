import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-native"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        emitDeclarationOnly: false,
        declarationDir: undefined,
      }),
    ],
  },
  {
    input: "types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
  },
];
