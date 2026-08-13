import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const pagesBasePath = loadEnv(mode, '.', 'VITE_').VITE_BASE_PATH
  const base = pagesBasePath ? `${pagesBasePath.replace(/\/+$/, '')}/` : '/'

  return {
    base,
    plugins: [react()],
    build: { target: 'es2022' },
  }
})
