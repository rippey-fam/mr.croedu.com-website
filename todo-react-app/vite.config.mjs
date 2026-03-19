import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "frontend-react",
  base: "/todo/dist/",
  build: {
    outDir: "../public/todo/dist/",
    emptyOutDir: true,
  },
});
