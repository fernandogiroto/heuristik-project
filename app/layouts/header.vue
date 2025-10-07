<template>
  <div class="header">
    <NuxtLink to="/">
      <img class="header__logo" src="@/assets/images/logo.svg" alt="Heuristik Logo" />
    </NuxtLink>

    <nav class="header__menu">
      <NuxtLink to="/">Home</NuxtLink>
      <a href="https://www.fernandogiroto.com" target="_blank" rel="noopener noreferrer">My Portfolio</a>
      <a href="https://github.com/fernandogiroto" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/fernandogiroto/" target="_blank" rel="noopener noreferrer">My Linkedin</a>
    </nav>

    <Button
      v-if="isClient"
      class="header__menu--hamburguer"
      type="button"
      icon="pi pi-ellipsis-v"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    />
    <Menu v-if="isClient" ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script setup lang="ts">

  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import Menu from 'primevue/menu'
  import Button from 'primevue/button'

  const router = useRouter()
  const menu = ref<any>(null)
  const isClient = ref(false)

  onMounted(() => {
    isClient.value = true
  })

  const items = [
    { label: 'Home', icon: 'pi pi-home', command: () => router.push('/') },
    { label: 'My Portfolio', icon: 'pi pi-external-link', command: () => window.open('https://www.fernandogiroto.com', '_blank') },
    { label: 'GitHub', icon: 'pi pi-github', command: () => window.open('https://github.com/fernandogiroto', '_blank') },
    { label: 'LinkedIn', icon: 'pi pi-linkedin', command: () => window.open('https://www.linkedin.com/in/fernandogiroto/', '_blank') },
  ]

  const toggle = (event: Event) => menu.value?.toggle(event)
  
</script>

<style lang="scss">
  @use '@/scss/mixings';
  @use '@/scss/variables';

  .header {
    @include mixings.flexbox(row, space-between, center);
    padding: 20px 40px;
    background: var(--header-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100px;
    &__logo {
      height: 40px;
      @media (max-width: variables.$lg-breakpoint) {
         height: 20px;
      }
    }
    &__menu {
      @include mixings.flexbox(row, space-between, center);
      gap: 20px;
      @media (max-width: variables.$md-breakpoint) {
        display: none;
      }
      &--hamburguer{
        @media (min-width: variables.$md-breakpoint) {
          display: none;
        }
      }
    }
  }
</style>
