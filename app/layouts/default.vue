<template>
  <Header />
  <div :class="isAnimePage ? 'container-fluid' : 'container'">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from '@/layouts/header.vue'

const route = useRoute()

const isAnimePage = computed(() => route.path.startsWith('/anime'))
</script>
