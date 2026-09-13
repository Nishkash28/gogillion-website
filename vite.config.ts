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
        let source = index.source
        if (app === 'lucida' && typeof source === 'string') {
          source = source
            .replace(
              '<link rel="canonical" href="https://gogillion.com/" />',
              '<link rel="canonical" href="https://gogillion.com/lucida" />',
            )
            .replace(
              '<link rel="icon" type="image/svg+xml" href="/assets/brand/gogillion-logo.svg" />',
              '<link rel="icon" type="image/png" href="/assets/apps/lucida-app-logo.png" />',
            )
            .replace(
              '<meta property="og:url" content="https://gogillion.com/" />',
              '<meta property="og:url" content="https://gogillion.com/lucida" />',
            )
            .replace(
              '<meta property="og:title" content="GoGillion Technologies" />',
              '<meta property="og:title" content="Lucida® | GoGillion Technologies" />',
            )
            .replace(
              '<meta property="og:image" content="https://gogillion.com/og.png" />',
              '<meta property="og:image" content="https://gogillion.com/assets/apps/lucida-app-logo.png" />\n    <meta property="og:image:type" content="image/png" />',
            )
            .replace('<meta property="og:image:width" content="1200" />', '<meta property="og:image:width" content="1287" />')
            .replace('<meta property="og:image:height" content="630" />', '<meta property="og:image:height" content="1743" />')
            .replace(
              '<meta property="og:image:alt" content="GoGillion Technologies" />',
              '<meta property="og:image:alt" content="Lucida Celestial Alignment logo" />',
            )
            .replace(
              '<meta name="twitter:card" content="summary_large_image" />',
              '<meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:image" content="https://gogillion.com/assets/apps/lucida-app-logo.png" />',
            )
            .replace('<title>GoGillion Technologies</title>', '<title>Lucida® | GoGillion Technologies</title>')
        }
        this.emitFile({ type: 'asset', fileName: `${app}/index.html`, source })
      }
    },
  }],
  build: { target: 'es2022' },
})
