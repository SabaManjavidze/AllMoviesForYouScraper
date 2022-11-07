export type Episode = {
  id?: string;
  epName: string;
  epNumber: string;
  url?: string;
};

export type Movie = {
  title: string;
  thumbnail_url: string;
  url?: string;
};

export type MovieType = "series" | "movies" | "episode";
