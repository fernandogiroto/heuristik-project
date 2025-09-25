import { mount } from '@vue/test-utils'
import AnimeDetails from '@/pages/[id].vue' 
import { getAnimeById, getEpisodes } from '@/services/animes'
import { vi, describe, it, expect } from 'vitest'
import flushPromises from 'flush-promises'

vi.mock('@/services/animes', () => ({
  getAnimeById: vi.fn(),
  getEpisodes: vi.fn(),
}))

const mockAnime = {
  data: {
    data: {
      mal_id: 1,
      title: 'Test Anime',
      episodes: 12,
      synopsis: 'Test synopsis',
      images: {
        jpg: {
          image_url: 'https://test.com/image.jpg',
          large_image_url: 'https://test.com/large.jpg',
        },
      },
    },
  },
}

const mockEpisodes = {
  data: {
    data: [
      {
        mal_id: 101,
        title: 'Episode 1',
        aired: '2023-01-01T00:00:00+00:00',
        score: 4.5,
        url: 'https://test.com/episode1',
      },
      {
        mal_id: 102,
        title: 'Episode 2',
        aired: '2023-01-08T00:00:00+00:00',
        score: 4.0,
        url: 'https://test.com/episode2',
      },
    ],
  },
}

describe('AnimeDetails.vue', () => {
  it('renders anime details and episodes', async () => {
    (getAnimeById as unknown as vi.Mock).mockResolvedValue(mockAnime)
    (getEpisodes as unknown as vi.Mock).mockResolvedValue(mockEpisodes)

    const $route = { params: { id: 1 } } // Mock da rota
    const wrapper = mount(AnimeDetails, {
      global: {
        mocks: {
          $route,
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Test Anime')
    expect(wrapper.text()).toContain('12')
    expect(wrapper.text()).toContain('Test synopsis')

    const header = wrapper.find('.anime-details__header')
    expect(header.attributes('style')).toContain('https://test.com/image.jpg')

    const rows = wrapper.findAll('tr')
    expect(rows.length).toBeGreaterThan(1)
    expect(wrapper.text()).toContain('Episode 1')
    expect(wrapper.text()).toContain('Episode 2')
  })

  it('calls getAnimeById and getEpisodes on mounted', async () => {
    (getAnimeById as unknown as vi.Mock).mockResolvedValue(mockAnime)
    (getEpisodes as unknown as vi.Mock).mockResolvedValue(mockEpisodes)

    const $route = { params: { id: 1 } }
    mount(AnimeDetails, {
      global: { mocks: { $route } },
    })
    await flushPromises()

    expect(getAnimeById).toHaveBeenCalledWith(1)
    expect(getEpisodes).toHaveBeenCalledWith(1)
  })
})
