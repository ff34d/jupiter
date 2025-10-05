import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import fs from "fs"
import path from "path"
import copy from "rollup-plugin-copy"

/*
 * Config
 */
const packages = ["packages/core"]

export default packages.map(createPackageConfig)

/*
 * Utils
 */
function createPackageConfig(pkg) {
  return /** @type {import("rollup").RollupOptions} */ ({
    input: path.resolve(pkg, "index.ts"),
    output: [
      {
        file: path.resolve(pkg, "_/dist/index.cjs.js"),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: path.resolve(pkg, "_/dist/index.esm.js"),
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      clearDir(pkg),
      resolve({ extensions: [".ts", ".js"] }),
      typescript({ tsconfig: path.resolve(pkg, "tsconfig.json") }),
      copy({
        targets: [
          { src: "LICENSE", dest: path.resolve(pkg, "_") },
          { src: `${pkg}/package.json`, dest: path.resolve(pkg, "_") },
          { src: `${pkg}/README.md`, dest: path.resolve(pkg, "_") },
        ],
      }),
    ],
  })
}

/*
 * Custom plugins
 */
function clearDir(pkg) {
  return {
    name: "clear-dir",
    buildStart() {
      const pkgDir = path.resolve(pkg, "_")
      if (!fs.existsSync(pkgDir)) return
      fs.rmSync(pkgDir, { recursive: true, force: true })
    },
  }
}
