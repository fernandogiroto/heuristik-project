<template>
  <div class="header">
      <NuxtLink to="/" class="hover:underline">
        <img class="header__logo" src="@/assets/images/logo.svg" alt="Heuristik Logo" />
      </NuxtLink>
      <nav class="header__menu">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <a :href="'https://www.fernandogiroto.com'" 
          target="_blank" 
          rel="noopener noreferrer">
          My Portfolio
        </a>
        <a :href="'https://github.com/fernandogiroto'" 
          target="_blank" 
          rel="noopener noreferrer">
          GitHub
        </a>
        <a :href="'https://www.linkedin.com/in/fernandogiroto/'" 
          target="_blank" 
          rel="noopener noreferrer">
          My Linkedin
        </a>
      </nav>
  </div>

</template>

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
    &_logo {
      height: 40px;
    }
    &__menu{
      @include mixings.flexbox(row, space-between, center);
      gap: 20px;
    }
  }

</style>