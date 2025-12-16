import { defineConfig } from "rollup"

const modules = ["core", "async", "events", "log"]

export default defineConfig([
  {
    input: "src/index.js",
    output: [
      { file: "dist/index.esm.js", format: "esm" },
      { file: "dist/index.cjs.js", format: "cjs" },
      { file: "dist/index.umd.js", format: "umd", name: "CoreKit" }
    ]
  },
  ...modules.map(name => ({
    input: `src/${name}/index.js`,
    output: [
      { file: `dist/${name}/index.esm.js`, format: "esm" },
      { file: `dist/${name}/index.cjs.js`, format: "cjs" }
    ]
  }))
])
