import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: { exclude: ['fsevents'] },
  build: {
    rollupOptions: {
      external: ['fs/promises'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Example: Create a separate chunk for each top-level node_module
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    }
  }
})
