import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	outDir: "dist",
	dts: true,
	clean: true,
	minify: true
})
