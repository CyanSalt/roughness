import * as path from 'node:path'
import vue from '@vitejs/plugin-vue'
import fastglob from 'fast-glob'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

function stripExtension(file: string) {
  return file.slice(0, -path.extname(file).length)
}

export default defineConfig(async () => ({
  build: {
    minify: false,
    lib: {
      entry: {
        index: 'src/index.ts',
        ...Object.fromEntries((await fastglob('src/*/*.vue')).map(file => {
          return [stripExtension(path.relative('src', file)), file]
        })),
      },
      formats: ['es' as const],
      fileName: () => '[name].js',
      cssFileName: 'style',
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
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json',
      cleanVueFileName: true,
      staticImport: true,
    }),
  ],
}))
