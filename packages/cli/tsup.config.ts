import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  dts: false,
  clean: true,
  minify: true,
  bundle: true,
  target: "node18",
  platform: "node",
  shims: true,
  external: [],
  esbuildOptions(options) {
    options.tsconfig = "tsconfig.build.json";
  },
});