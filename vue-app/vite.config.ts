import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    APP_NAME: JSON.stringify(`${pkg.name}`),
    APP_ROOT: JSON.stringify(`/${pkg.name}/`),
    APP_ENTRYPOINT: JSON.stringify(`/${pkg.name}/${pkg.name}.es.js`),
  },
  base: `/${pkg.name}/`,
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, "../shell/public/vue-app"),
    lib: {
      formats: ["es"],
      entry: path.join(__dirname, "src/index.ts"),
    },
  },
});
