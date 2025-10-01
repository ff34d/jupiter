import typescript from "@rollup/plugin-typescript";
import path from "path";

const packages = ["packages/core/component", "packages/core/_api"];

export default packages.map((pkg) => ({
  input: path.resolve(pkg, "src/index.ts"),
  output: [
    {
      file: path.resolve(pkg, "dist/index.cjs.js"),
      format: "cjs",
      sourcemap: true,
    },
    {
      file: path.resolve(pkg, "dist/index.esm.js"),
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: path.resolve("./tsconfig.json"),
      rootDir: path.resolve(pkg, "src"),
      declarationDir: path.resolve(pkg, "dist"),
    }),
  ],
  external: (id) => !id.startsWith("."),
}));
