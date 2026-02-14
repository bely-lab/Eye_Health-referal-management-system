import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: './postcss.config.js',  // Or './postcss.config.cjs' if using CommonJS
  },
  define: {
    'process.env': process.env,
  },
})
