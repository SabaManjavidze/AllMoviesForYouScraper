export type Episode = {
  id?: string;
  epName: string;
  epNumber: string;
  url?: string;
};

export type Movie = {
  slug: string;
  title: string;
  thumbnail_url: string;
  url?: string;
  movieType: MovieType;
};
export type VideoObj = {
  video: string;
  quality: string | "1080p" | "720p" | "480p";
};

export type MovieType = "series" | "movies" | "episode";
