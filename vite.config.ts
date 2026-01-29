
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This allows access to process.env in the browser for the API key if you set it in a .env file
    'process.env': process.env
  }
})
