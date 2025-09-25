export interface AnimeImage {
  jpg: {
    image_url: string
    large_image_url: string
  }
}

export interface Anime {
  mal_id: number
  title: string
  episodes: number
  synopsis: string
  images: AnimeImage
}

export interface Episode {
  mal_id: number
  title: string
  aired: string
  score: number
  url: string
}

export interface Pagination {
  items: {
    count: number
    total: number
    per_page: number
  }
}

export interface AnimeListResponse {
  data: Anime[]
  pagination: Pagination
}
