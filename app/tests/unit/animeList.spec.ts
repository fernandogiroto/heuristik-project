import { mount } from '@vue/test-utils'
import AnimeList from '@/pages/animeList.vue'
import { getAnimes } from '@/services/animes'
import { vi, describe, it, expect } from 'vitest'
import flushPromises from 'flush-promises'

vi.mock('@/services/animes', () => ({
  getAnimes: vi.fn(),
}))

const mockData = {
  data: {
    data: [
      {
        mal_id: 1,
        title: 'Test Anime',
        episodes: 12,
        images: { 
          jpg: { 
            image_url: 'https://test.com/image.jpg', 
            large_image_url: 'https://test.com/large.jpg' 
          } 
        },
        synopsis: 'Test synopsis',
      },
    ],
    pagination: { items: { total: 1 } },
  },
}

describe('AnimeList.vue', () => {
  it('renders a list of animes', async () => {
    ;(getAnimes as unknown as vi.Mock).mockResolvedValue(mockData)

    const wrapper = mount(AnimeList)
    await flushPromises()
    expect(wrapper.text()).toContain('Test Anime')
    expect(wrapper.text()).toContain('12')
    expect(wrapper.text()).toContain('Test synopsis')

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://test.com/image.jpg')

    const cards = wrapper.findAllComponents({ name: 'Card' })
    expect(cards).toHaveLength(1)
  })

  it('calls getAnimes on mounted', async () => {
    (getAnimes as unknown as vi.Mock).mockResolvedValue(mockData)
    mount(AnimeList)
    await flushPromises()
    expect(getAnimes).toHaveBeenCalledTimes(1)
  })
})
