<template>
  <div v-if="anime" class="anime-details">
    <div
      class="anime-details__header"
      :style="{ backgroundImage: `url(${anime?.images?.jpg?.image_url})` }"
    >
      <div class="anime-details__header__overlay">
        <h1 class="anime-details__header__overlay--title">{{ anime?.title }}</h1>
        <p class="anime-details__header__overlay--episodes">
          {{ anime?.episodes || 0 }} episodes
        </p>
      </div>
    </div>
    <div class="anime-details__content">
      <h1 class="anime-details__content--title">Description</h1>
      <span class="anime-details__content--descripition">{{ anime?.synopsis }}</span>
      <DataTable class="anime-details__content--list" :value="episodes" v-if="episodes?.length">
        <Column field="mal_id" header="Episode" />
        <Column field="title" header="Title" />
        <Column field="score" header="Score">
          <template #body="slotProps">
            <Rating
              :modelValue="slotProps.data.score"
              :readonly="true"
              :stars="5"
              :cancel="false"
            />
          </template>
        </Column>
        <Column field="aired" header="Aired">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.aired) }}
          </template>
        </Column>
        <Column field="url" header="Watch">
          <template #body="slotProps">
            <a 
              :href="slotProps.data.url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="p-button p-component">
              Watch Episode
            </a>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router' // ✅ ADICIONAR ESTA IMPORT
  import { getAnimeById, getEpisodes } from '@/services/animes'
  import type { Anime, Episode } from '@/types/anime'
  import { formatDate } from '@/helpers/dateFormat'

  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Rating from 'primevue/rating'

  const route = useRoute() // ✅ AGORA ESTÁ CORRETO

  const id = Number(route.params.id)
  const anime = ref<Anime | null>(null)
  const episodes = ref<Episode[]>([])

  onMounted(async () => {
    try {
      const resAnime = await getAnimeById(id)
      anime.value = resAnime.data.data as Anime

      const resEpisodes = await getEpisodes(id)
      episodes.value = resEpisodes.data.data as Episode[]
    } catch (err) {
      console.error('Error loading anime or episodes:', err)
    }
  })
</script>

<style lang="scss">
  @use '@/scss/mixings';
  @use '@/scss/variables';

  .anime-details {
    &__header {
      @include mixings.flexbox(column, initial, flex-end);
      position: relative;
      width: 100%;
      height: 400px;
      background-size: cover;
      background-position: center;
      &__overlay {
        @include mixings.flexbox(column, flex-end ,initial);
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent 60%);
        padding: 2rem;
        display: flex;
        &--title {
          color: var(--theme-color);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        &--episodes {
          color: var(--neutral-40);
          font-size: 1rem;
        }
      }
    }
    &__content{
      @include mixings.flexbox(column, initial, initial);
      gap: 1rem;
      padding: 3.5rem;
      height: auto;
      width: 100%;
      @include mixings.scrollbar-none();
      @media (max-width: variables.$md-breakpoint) {
        padding: 1.5rem;
      }
      &--title{
        font-size: 1.5rem;
        font-weight: var(--fw-bold);
        color: var(--text-color);
      }
      &--descripition{
        font-size: 1rem;
        color: var(--text-color);
        text-align: justify;
      }
      &--list{
        margin-top: 1.5rem;
        width: 100%;
      }
    }
  }
</style>