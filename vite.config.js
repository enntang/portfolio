import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Allow overriding base (e.g. GitHub Pages project site at /<repo>/)
  // via VITE_BASE in .env files or workflow env.
  const env = loadEnv(mode, process.cwd(), '')
  // Prefer real environment variables (GitHub Actions `env:`) over .env files.
  const explicitBase = (process.env.VITE_BASE || env.VITE_BASE || '').trim()
  let base = explicitBase || '/'

  // Self-heal on GitHub Pages builds even if VITE_BASE is not provided.
  // GitHub provides GITHUB_REPOSITORY='owner/name' in Actions and Pages builds.
  const repo = (process.env.GITHUB_REPOSITORY || '').trim()
  const repoName = repo.includes('/') ? repo.split('/')[1] : repo
  if (!explicitBase && repoName) {
    base = repoName.endsWith('.github.io') ? '/' : `/${repoName}/`
  }

  // Helpful debug for diagnosing white-screen issues on Pages (shows in Actions logs).
  console.log('[vite] base =', base)

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
