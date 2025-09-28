/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'
import vue from '@vitejs/plugin-vue' // já instalado via Nuxt

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['app/tests/**/*.spec.ts'], // pega todos os testes
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'), // @ aponta para a pasta app
    },
  },
})
