// USER Types
export type CurrentUser = {
  id: string | undefined;
  email: string | undefined;
};

export type AuthState = {
  user: CurrentUser | null;
};

export type AuthAction = {
  setUser: (data: CurrentUser) => void;
  clearUser: () => void;
};

// FILTER Types
export type Filter = {
  price?: string;
  language?: string;
  level?: string;
};

export type FilterState = {
  filter: Filter | null;
};

export type FilterAction = {
  setFilter: (data: Filter) => void;
  clearFilter: () => void;
};

// FAVORITES Types
export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type Teacher = {
  id: number;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
};

export type FavoritesState = {
  favorites: Teacher[];
};

export type FavoritesAction = {
  addToFav: (data: Teacher) => void;
  removeFromFav: (id: number) => void;
};

// FILTER Types
export type Theme = 'theme1' | 'theme2' | 'theme3' | 'theme4' | 'theme5';

export type ThemeState = {
  current: Theme;
  setTheme: (theme: Theme) => void;
};
