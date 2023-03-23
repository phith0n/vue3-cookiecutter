import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import analyze from 'rollup-plugin-analyzer'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // use this plugin if you have a big dependencies
    // chunkSplitPlugin({
    //   strategy: 'all-in-one',
    //   customSplitting: {
    //     'codemirror': ['codemirror'],
    //   }
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      }
    },
  },
  server: {
    port: {{cookiecutter.frontend_port}},
    proxy: {
      "/api": "{{cookiecutter.backend_url}}"
    }
  },
  build: {
    rollupOptions: {
      plugins: [analyze({
        hideDeps: true,
        summaryOnly: true,
        limit: 10
      })],
    },
  }
})
