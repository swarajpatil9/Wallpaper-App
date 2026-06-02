import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@clerk")) {
            return "clerk";
          }

          if (id.includes("framer-motion")) {
            return "motion";
          }

          if (
            id.includes("react-router") ||
            id.includes(`${"node_modules"}/react/`) ||
            id.includes(`${"node_modules"}/react-dom/`)
          ) {
            return "react";
          }

          return undefined;
        },
      },
    },
  },
});
