import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       app: 'index.html',
  //     },
  //   },
  // },
  // server: {
  //   open: '/view/index.html',
  // },
  server: {
    host: '172.31.89.10',
    port: 5173,
  },
})
