import typescript from "@rollup/plugin-typescript"
import fs from "fs"
import path from "path"
import copy from "rollup-plugin-copy"

/*
 * Constants
 */
const packages = [
  "packages/core/lib",
  "packages/core/component",
  "packages/core/api",
]

/*
 * Rollup config
 */
export default packages.map((pkg) => ({
  input: path.resolve(pkg, "src/index.ts"),
  output: [
    {
      file: path.resolve(pkg, "package/dist/index.cjs.js"),
      format: "cjs",
      sourcemap: true,
    },
    {
      file: path.resolve(pkg, "package/dist/index.esm.js"),
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    preBuildPlugin(pkg),
    typescript({
      tsconfig: path.resolve("./tsconfig.json"),
      rootDir: path.resolve(pkg, "src"),
      declarationDir: path.resolve(pkg, "package/dist"),
    }),
    copy({
      targets: [
        { src: "LICENSE", dest: path.resolve(pkg, "package") },
        {
          src: path.resolve(pkg, "package.json"),
          dest: path.resolve(pkg, "package"),
        },
      ],
    }),
  ],
  external: (id) => !id.startsWith("."),
}))

/*
 * Custom plugins
 */
function preBuildPlugin(pkg) {
  return {
    name: "pre-build",
    buildStart() {
      const pkgDir = path.resolve(pkg, "package")

      console.log("")

      if (fs.existsSync(pkgDir)) {
        console.log(`[PRE-BUILD]: Cleaning ${pkgDir}...`)
        fs.rmSync(pkgDir, { recursive: true, force: true })
        console.log("[PRE-BUILD]: Success cleaning ✅")
      } else {
        console.log("[PRE-BUILD]: Empty path, skip this ⚠️")
      }

      console.log("")
    },
  }
}
