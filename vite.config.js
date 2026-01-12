import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Allow overriding base (e.g. GitHub Pages project site at /<repo>/)
  // via VITE_BASE in .env files or workflow env.
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE || '/'

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        '@projects': path.resolve(process.cwd(), 'src/assets/projects'),
      },
    },
  }
})
