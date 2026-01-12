import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve(process.cwd(), 'dist')
const indexPath = path.join(distDir, 'index.html')
const notFoundPath = path.join(distDir, '404.html')
const noJekyllPath = path.join(distDir, '.nojekyll')

const indexHtml = await fs.readFile(indexPath, 'utf8')
await fs.writeFile(notFoundPath, indexHtml, 'utf8')
// Prevent GitHub Pages (Jekyll) from ignoring files/folders that start with underscores.
await fs.writeFile(noJekyllPath, '', 'utf8')

console.log('Copied dist/index.html -> dist/404.html (SPA fallback)')
console.log('Wrote dist/.nojekyll')

