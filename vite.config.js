import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio/', // 子目錄名稱，與 Repo 名稱一致
  plugins: [react()],
});