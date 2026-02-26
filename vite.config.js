import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Pastikan nama repo sama persis dengan di GitHub (I besar/kecil berpengaruh)
  base: "/testingIsd/", 
})