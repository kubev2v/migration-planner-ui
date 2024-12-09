import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig((_env) => {
  return {
    define: {
      'process.env': dotenv.config().parsed
    },
    plugins: [tsconfigPaths(), react()],
    server: {
      proxy: {
        "/planner/api": {
          target: "http://172.17.0.3:3443",
          changeOrigin: true,
          rewrite: (path): string => path.replace(/^\/planner/, ""),
        },
        "/agent/api/v1": {
          target: "http://172.17.0.3:3333",
          changeOrigin: true,
          rewrite: (path): string => path.replace(/^\/agent/, ""),
        },
      },
    },
  };
});
