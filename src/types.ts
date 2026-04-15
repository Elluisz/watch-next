export interface Show {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    genre_ids: number[];
    first_air_date: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface TMDBResponse<T> {
    results: T[];
    page: number;
    total_pages: number;
    total_results: number;
  }