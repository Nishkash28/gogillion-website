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
      if (typeof index.source !== 'string') throw new Error('Unexpected landing page output')
      const homeHtml = index.source
      for (const app of ['lucida', 'hera', 'nirvaan']) {
        let source = homeHtml
        if (app === 'lucida') {
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

      const privacyHtml = homeHtml
        .replace(
          '<meta name="description" content="GoGillion Technologies builds AI-enabled applications that combine codified human expertise, guardrailed intelligence and safety by design." />',
          '<meta name="description" content="Read the Lucida Privacy Policy to learn how GoGillion Technologies handles personal data in the Lucida app." />\n    <meta name="robots" content="noindex, follow" />',
        )
        .replace(
          '<link rel="canonical" href="https://gogillion.com/" />',
          '<link rel="canonical" href="https://gogillion.com/lucida/privacy" />',
        )
        .replace(
          '<link rel="icon" type="image/svg+xml" href="/assets/brand/gogillion-logo.svg" />',
          '<link rel="icon" type="image/png" href="/assets/apps/lucida-app-logo.png" />',
        )
        .replace(
          '<meta property="og:url" content="https://gogillion.com/" />',
          '<meta property="og:url" content="https://gogillion.com/lucida/privacy" />',
        )
        .replace(
          '<meta property="og:title" content="GoGillion Technologies" />',
          '<meta property="og:title" content="Lucida Privacy Policy | GoGillion Technologies" />',
        )
        .replace(
          '<meta property="og:description" content="Intelligence for Whatever Life Asks. Human expertise, made computable through guardrailed AI." />',
          '<meta property="og:description" content="How Lucida collects, uses, protects and retains personal data." />',
        )
        .replace(
          '<meta property="og:image" content="https://gogillion.com/og.png" />',
          '<meta property="og:image" content="https://gogillion.com/assets/apps/lucida-app-logo.png" />',
        )
        .replace('<meta property="og:image:width" content="1200" />', '<meta property="og:image:width" content="1287" />')
        .replace('<meta property="og:image:height" content="630" />', '<meta property="og:image:height" content="1743" />')
        .replace(
          '<meta property="og:image:alt" content="GoGillion Technologies" />',
          '<meta property="og:image:alt" content="Lucida Celestial Alignment logo" />',
        )
        .replace('<title>GoGillion Technologies</title>', '<title>Lucida Privacy Policy | GoGillion Technologies</title>')
      this.emitFile({ type: 'asset', fileName: 'lucida/privacy.html', source: privacyHtml })
      this.emitFile({ type: 'asset', fileName: 'lucida/privacy/index.html', source: privacyHtml })
    },
  }],
  build: { target: 'es2022' },
})
