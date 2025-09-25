import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as animeService from '@/services/animes'
import api from '@/services/api'

vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('anime service', () => {
  const mockAnimeResponse = { data: { data: [{ mal_id: 1, title: 'Test Anime' }] } }
  const mockEpisodesResponse = { data: { data: [{ mal_id: 101, title: 'Episode 1' }] } }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAnimes calls api.get with correct params', async () => {
    ;(api.get as unknown as vi.Mock).mockResolvedValue(mockAnimeResponse)
    const res = await animeService.getAnimes(2, 10)
    expect(api.get).toHaveBeenCalledWith('/anime', { params: { page: 2, limit: 10 } })
    expect(res).toEqual(mockAnimeResponse)
  })

  it('getAnimeById calls api.get with correct id', async () => {
    ;(api.get as unknown as vi.Mock).mockResolvedValue(mockAnimeResponse)
    const res = await animeService.getAnimeById(5)
    expect(api.get).toHaveBeenCalledWith('/anime/5')
    expect(res).toEqual(mockAnimeResponse)
  })

  it('getEpisodes calls api.get with correct animeId', async () => {
    ;(api.get as unknown as vi.Mock).mockResolvedValue(mockEpisodesResponse)
    const res = await animeService.getEpisodes(3)
    expect(api.get).toHaveBeenCalledWith('/anime/3/episodes')
    expect(res).toEqual(mockEpisodesResponse)
  })

  it('getEpisode calls api.get with animeId and episodeNumber', async () => {
    ;(api.get as unknown as vi.Mock).mockResolvedValue(mockEpisodesResponse)
    const res = await animeService.getEpisode(3, 2)
    expect(api.get).toHaveBeenCalledWith('/anime/3/episodes/2')
    expect(res).toEqual(mockEpisodesResponse)
  })
})
