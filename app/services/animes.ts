import api from '@/services/api'
import type { AnimeListResponse, Anime, Episode } from '@/types/anime'
import type { AxiosResponse } from 'axios'

export const getAnimeById = (animeId: number): Promise<AxiosResponse<{ data: Anime }>> =>
  api.get(`/anime/${animeId}`)

export const getAnimes = (
  page = 1,
  limit = 9
): Promise<AxiosResponse<AnimeListResponse>> =>
  api.get('/anime', { params: { page, limit } })

export const getEpisodes = (animeId: number): Promise<AxiosResponse<{ data: Episode[] }>> =>
  api.get(`/anime/${animeId}/episodes`)

export const getEpisode = (animeId: number, episodeNumber: number): Promise<AxiosResponse<{ data: Episode }>> =>
  api.get(`/anime/${animeId}/episodes/${episodeNumber}`)
