import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sesuai dengan nama repo di 'homepage' package.json Anda
  base: "/testingIsd/", 
})