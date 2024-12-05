import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig((_env) => {
  return {
    plugins: [tsconfigPaths(), react()],
    server: {
      proxy: {
        "/agent/api/v1": {
          target: "http://127.0.0.1:3333",
          changeOrigin: true,
          rewrite: (path): string => path.replace(/^\/agent/, ""),
        },
      },
    },
  };
});
