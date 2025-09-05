import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 🔹 import alias
    },
  },
  build: {
    outDir: 'docs', // ✅ use docs instead of dist
  },
  base: "/uitgeleend/", // GitHub repo naam,
  
})

