import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: [
      'react-icons/si',
      'react-icons/fi',
      'react-icons/gr', 
      'react-icons/bs',
      'react-icons/io',
      'react-icons/fa',
      'lucide-react'
    ]
  },
  server: {
    host: true,        // listen on 0.0.0.0
    port: 5173,        // optional: specify dev port
    strictPort: false  // fallback if port is busy
  }
})
