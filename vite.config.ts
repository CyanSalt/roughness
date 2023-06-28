import * as path from 'node:path'
import vue from '@vitejs/plugin-vue'
import fastglob from 'fast-glob'
import { defineConfig } from 'vite'

export default defineConfig(async () => ({
  build: {
    minify: false,
    lib: {
      entry: {
        index: 'src/index.ts',
        ...Object.fromEntries((await fastglob('src/*/index.vue')).map(file => {
          return [path.basename(path.dirname(file)), file]
        })),
      },
      formats: ['es'],
      fileName: (format, entryName) => {
        return entryName === 'index' ? '[name].js' : '[name]/index.js'
      },
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        chunkFileNames: 'chunks/dep-[hash].js',
      },
    },
  },
  plugins: [
    vue(),
  ],
}))
