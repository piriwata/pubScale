import { resolve } from "path";
import { defineConfig } from "vite";
import builtins from "builtin-modules";

export default defineConfig(({ mode }) => {
  return {
    build: {
      // Use Vite lib mode https://vitejs.dev/guide/build.html#library-mode
      lib: {
        entry: resolve(__dirname, "main.ts"),
        formats: ["cjs"],
      },
      sourcemap: mode === "production" ? false : "inline",
      minify: mode === "production",
      rollupOptions: {
        output: {
          // Overwrite default Vite output fileName
          entryFileNames: "main.js",
          assetFileNames: "styles.css",
        },
        external: [
          "obsidian",
          "electron",
          "codemirror",
          "@codemirror/autocomplete",
          "@codemirror/closebrackets",
          "@codemirror/collab",
          "@codemirror/commands",
          "@codemirror/comment",
          "@codemirror/fold",
          "@codemirror/gutter",
          "@codemirror/highlight",
          "@codemirror/history",
          "@codemirror/language",
          "@codemirror/lint",
          "@codemirror/matchbrackets",
          "@codemirror/panel",
          "@codemirror/rangeset",
          "@codemirror/rectangular-selection",
          "@codemirror/search",
          "@codemirror/state",
          "@codemirror/stream-parser",
          "@codemirror/text",
          "@codemirror/tooltip",
          "@codemirror/view",
          "@lezer/common",
          "@lezer/lr",
          "@lezer/highlight",
          ...builtins,
        ],
      },
      // Use root as the output dir
      emptyOutDir: false,
      outDir: ".",
    },
  };
});
