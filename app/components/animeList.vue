<template>
  <div class="animes">
    <Card
      class="card-anime"
      v-for="anime in animes"
      :key="anime.mal_id"
      @click="goToAnime(anime)"
    >
    <template #header>
      <picture>
        <source :srcset="anime.images.jpg.large_image_url" media="(min-width: 1024px)" />
        <source :srcset="anime.images.jpg.image_url" media="(max-width: 1023px)" />
        <img
          :src="anime.images.jpg.image_url"
          :alt="anime.title"
          class="card-anime__image"
          loading="lazy"
        />
      </picture>
    </template>
      <template #title>{{ anime.title }}</template>
      <template #subtitle>
        <div class="card-anime__subtitle">
          <i class="pi pi-video"></i>
          <span class="card-anime__subtitle--episodes">{{ anime.episodes }}</span>
          <span class="card-anime__subtitle--label">episodes</span>
        </div>
      </template>
      <template #content>
        <span class="card-anime--synopsis" v-text="anime.synopsis" />
      </template>
    </Card>
  </div>
    <Paginator
      v-model:page="page"
      :rows="rows"
      :totalRecords="totalRecords"
      :page-link-size="3"
      @page="onPageChange"
    />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router' // ✅ ADICIONAR ESTA IMPORT
  import { getAnimes } from '@/services/animes'
  import type { Anime } from '@/types/anime'

  import Card from 'primevue/card'
  import Paginator from 'primevue/paginator'

  const router = useRouter() // ✅ AGORA ESTÁ CORRETO

  const animes = ref<Anime[]>([])
  const page = ref(1)      
  const rows = ref(9)           
  const totalRecords = ref(0)    
  const loading = ref(false)

  const loadAnimes = async () => {
    loading.value = true
    try {
      const res = await getAnimes(page.value, rows.value)
      animes.value = res.data.data
      totalRecords.value = res.data.pagination.items.total
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const onPageChange = (event: { page: number; rows: number }) => {
    page.value = event.page + 1
    rows.value = event.rows
    loadAnimes()
  }

  const goToAnime = (anime: Anime) => {
    router.push({
      name: 'anime-id',
      params: { id: anime.mal_id }
    })
  }

  onMounted(() => loadAnimes())
</script>

<style lang="scss">
  @use '@/scss/mixings';
  @use '@/scss/variables';

  .animes {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    flex-wrap: wrap;
    @media (max-width: variables.$md-breakpoint) {
      flex-direction: column;
      gap: 35px;
    }
  }

  .card-anime {
    width: 100%;
    cursor: pointer;
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-12px);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
    }

    &__image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 12px 12px 0 0;
    }

    &__subtitle {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
    }

    &--synopsis {
      display: -webkit-box;
      -webkit-line-clamp: 3;  
      -webkit-box-orient: vertical;  
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (min-width: variables.$lg-breakpoint) {
      width: 45%;
    }
    @media (min-width: variables.$xl-breakpoint) {
      width: 30%;
    }
  }
</style>