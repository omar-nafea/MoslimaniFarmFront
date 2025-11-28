import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target:
            env.VITE_API_URL?.replace("/api", "") || "http://localhost:8000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      // Expose env variables to the app
      "import.meta.env.VITE_API_URL": JSON.stringify(
        env.VITE_API_URL || "https://302ce27185c1.ngrok-free.app/api",
      ),
    },
  };
});
