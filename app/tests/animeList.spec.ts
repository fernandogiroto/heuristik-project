/// <reference types="vitest" />
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import PrimeVue from 'primevue/config'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    go: vi.fn(),
    replace: vi.fn(),
  }),
  useRoute: () => ({
    path: '/',
    params: {},
    query: {},
  })
}))

const { mockGetAnimes } = vi.hoisted(() => ({
  mockGetAnimes: vi.fn()
}))

vi.mock('@/services/animes', () => ({
  getAnimes: mockGetAnimes,
}))

import AnimeList from '@/components/animeList.vue'

const mockData = {
  data: {
    data: [
      { 
        mal_id: 1, 
        title: 'Test Anime', 
        episodes: 12, 
        images: { jpg: { image_url: 'https://test.com/image.jpg' } }, 
        synopsis: 'Test synopsis' 
      },
    ],
    pagination: { items: { total: 1 } },
  },
}

describe('AnimeList.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetAnimes.mockResolvedValue(mockData)
  })

  it('renders a list of animes', async () => {
    const wrapper = mount(AnimeList, {
      global: {
        plugins: [PrimeVue]
      }
    })
    await flushPromises()

    expect(wrapper.text()).toContain('Test Anime')
  })

  it('calls getAnimes on mounted', async () => {
    mount(AnimeList, {
      global: {
        plugins: [PrimeVue]
      }
    })
    await flushPromises()
    expect(mockGetAnimes).toHaveBeenCalledTimes(1)
  })

  it('renders no animes if API returns empty list', async () => {
    mockGetAnimes.mockResolvedValue({ 
      data: { 
        data: [], 
        pagination: { items: { total: 0 } } 
      } 
    })
    const wrapper = mount(AnimeList, {
      global: {
        plugins: [PrimeVue]
      }
    })
    await flushPromises()
    
    expect(wrapper.findAll('.card-anime')).toHaveLength(0)
  })

  it('loads new animes when paginator changes page', async () => {
    const wrapper = mount(AnimeList, {
      global: {
        plugins: [PrimeVue]
      }
    })
    await flushPromises()

    await wrapper.vm.onPageChange({ page: 1, rows: 9 })
    expect(mockGetAnimes).toHaveBeenCalledWith(2, 9)
  })
})