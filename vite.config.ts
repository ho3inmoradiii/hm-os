import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
      "@components": resolve(rootDir, "src/components"),
      "@utils": resolve(rootDir, "src/utils"),
      "@store": resolve(rootDir, "src/store"),
      "@constants": resolve(rootDir, "src/constants"),
      "@hoc": resolve(rootDir, "src/hoc"),
      "@windows": resolve(rootDir, "src/windows"),
      "@hooks": resolve(rootDir, "src/hooks"),
      "@types": resolve(rootDir, "src/types"),
    }
  }
})
