import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // We want Home at `/` (no `/portfolio` prefix). `/portfolio` is a real route.
  // So the app base must be `/` (not a deployment subpath).
  base: '/',
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@projects': path.resolve(process.cwd(), 'src/assets/projects')
    }
  }
})
