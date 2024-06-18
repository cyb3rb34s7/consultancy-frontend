import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
viteCommonjs()
  ],
  build: {
    rollupOptions: {
      external: ["@chakra-ui/react"],
    },
  },
});
