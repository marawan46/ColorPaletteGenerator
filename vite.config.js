import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js

export default defineConfig({
  base: '/ColorPaletteGenerator/', // 👈 match your GitHub repo name
  plugins: [react()],
});

