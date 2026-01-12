import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve(process.cwd(), 'dist')
const indexPath = path.join(distDir, 'index.html')
const notFoundPath = path.join(distDir, '404.html')

const indexHtml = await fs.readFile(indexPath, 'utf8')
await fs.writeFile(notFoundPath, indexHtml, 'utf8')

console.log('Copied dist/index.html -> dist/404.html (SPA fallback)')

