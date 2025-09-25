// nuxt.config.ts

import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'pt', 'data-theme': 'light' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Heuristik',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  modules: [
    '@primevue/nuxt-module' // <- módulo do PrimeVue
  ],

  primevue: {
    options: {
      ripple: true,             // efeito ripple global
      theme: { preset: Aura },  // tema Aura
      inputVariant: 'filled'
    },
    autoImport: true             // registra os componentes automaticamente
  }
})
