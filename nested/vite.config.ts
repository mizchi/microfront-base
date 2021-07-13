import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base: `/${pkg.name}/`,
  build: {
    emptyOutDir: true,
    outDir: path.join(__dirname, "../shell/public/nested"),
    lib: {
      formats: ["es"],
      entry: path.join(__dirname, "src/index.tsx"),
    },
  },
});
