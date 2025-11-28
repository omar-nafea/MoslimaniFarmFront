import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = env.VITE_API_URL || "https://302ce27185c1.ngrok-free.app/api";
  const backendUrl = apiUrl.replace("/api", "");

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
        "/images": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      },
    },
    define: {
      // Expose env variables to the app
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
      // Backend URL for converting absolute URLs to relative
      "import.meta.env.VITE_BACKEND_URL": JSON.stringify(backendUrl),
    },
  };
});
