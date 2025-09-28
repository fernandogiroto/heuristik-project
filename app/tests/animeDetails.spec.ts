import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import flushPromises from 'flush-promises'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import PrimeVue from 'primevue/config'

const { mockGetAnimeById, mockGetEpisodes } = vi.hoisted(() => ({
  mockGetAnimeById: vi.fn(),
  mockGetEpisodes: vi.fn()
}))

vi.mock('@/services/animes', () => ({
  getAnimeById: mockGetAnimeById,
  getEpisodes: mockGetEpisodes,
  getAnimes: vi.fn(),
  getEpisode: vi.fn()
}))

import AnimeDetails from '@/pages/anime/[id].vue'

const routes = [
  { path: '/anime/:id', component: AnimeDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const mockAnimeData = {
  data: {
    data: {
      mal_id: 1,
      title: 'Test Anime',
      episodes: 12,
      images: { 
        jpg: { 
          image_url: 'https://test.com/image.jpg',
          large_image_url: 'https://test.com/large-image.jpg'
        } 
      },
      synopsis: 'Test synopsis'
    }
  }
}

const mockEpisodesData = {
  data: {
    data: [
      {
        mal_id: 1,
        title: 'Episode 1',
        score: 4.5,
        aired: '2023-01-01T00:00:00+00:00',
        url: 'https://example.com/episode1'
      }
    ]
  }
}

describe('AnimeDetails.vue', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    mockGetAnimeById.mockResolvedValue(mockAnimeData)
    mockGetEpisodes.mockResolvedValue(mockEpisodesData)
    await router.replace('/anime/1')
  })

  it('renders anime details', async () => {
    const wrapper = mount(AnimeDetails, {
      global: {
        plugins: [PrimeVue, router]
      }
    })
    
    await router.isReady()
    
    expect(wrapper.text()).toContain('Carregando...')
    
    await flushPromises()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).not.toContain('Carregando...')
    expect(wrapper.text()).toContain('Test Anime')
    expect(wrapper.text()).toContain('Description')
    expect(wrapper.text()).toContain('Test synopsis')
  })

  it('calls getAnimeById and getEpisodes on mounted', async () => {
    mount(AnimeDetails, {
      global: {
        plugins: [PrimeVue, router]
      }
    })
    
    await router.isReady()
    await flushPromises()
    
    expect(mockGetAnimeById).toHaveBeenCalledWith(1)
    expect(mockGetEpisodes).toHaveBeenCalledWith(1)
  })

  it('renders episodes list when episodes are available', async () => {
    const wrapper = mount(AnimeDetails, {
      global: {
        plugins: [PrimeVue, router]
      }
    })
    
    await router.isReady()
    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Episode')
    expect(wrapper.text()).toContain('Episode 1')
    expect(wrapper.text()).toContain('Title')
    expect(wrapper.text()).toContain('Score')
    expect(wrapper.text()).toContain('Aired')
    expect(wrapper.text()).toContain('Watch')
  })

  it('shows loading state when data is loading', async () => {
    let resolveAnime: any, resolveEpisodes: any
    const animePromise = new Promise(resolve => { resolveAnime = resolve })
    const episodesPromise = new Promise(resolve => { resolveEpisodes = resolve })
    
    mockGetAnimeById.mockReturnValue(animePromise)
    mockGetEpisodes.mockReturnValue(episodesPromise)
    
    const wrapper = mount(AnimeDetails, {
      global: {
        plugins: [PrimeVue, router]
      }
    })
    
    await router.isReady()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Carregando...')
    
    resolveAnime(mockAnimeData)
    resolveEpisodes(mockEpisodesData)
    
    await flushPromises()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).not.toContain('Carregando...')
  })

  it('handles empty episodes list', async () => {
    mockGetEpisodes.mockResolvedValue({ data: { data: [] } })
    
    const wrapper = mount(AnimeDetails, {
      global: {
        plugins: [PrimeVue, router]
      }
    })
    
    await router.isReady()
    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Test Anime')
    expect(wrapper.text()).toContain('Description')
    expect(wrapper.find('.anime-details__content--list').exists()).toBe(false)
  })
})