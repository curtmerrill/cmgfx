import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: './index.html',
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    sourcemap: false
  },
  server: {
    open: true, // automatically open browser during dev
    port: 3000
  }
})
