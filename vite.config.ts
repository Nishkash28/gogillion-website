import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react(), {
    name: 'product-entry-pages',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html']
      if (!index || index.type !== 'asset') throw new Error('Missing landing page output')
      for (const app of ['lucida', 'hera', 'nirvaan']) {
        this.emitFile({ type: 'asset', fileName: `${app}/index.html`, source: index.source })
      }
    },
  }],
  build: { target: 'es2022' },
})
