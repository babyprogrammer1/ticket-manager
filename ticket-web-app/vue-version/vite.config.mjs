import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ESM Vite config — imports the ESM-only plugin directly.
export default defineConfig({
  plugins: [vue()]
})
