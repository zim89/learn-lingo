import { create } from 'zustand';
import {
  AuthAction,
  AuthState,
  FavoritesAction,
  FavoritesState,
  FilterAction,
  FilterState,
  Teacher,
  ThemeState,
} from '@/utils/zustand/types';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const useFilterStore = create<FilterState & FilterAction>()(
  devtools((set) => ({
    filter: null,
    setFilter: (data) => set(() => ({ filter: data })),
    clearFilter: () => set(() => ({ filter: null })),
  }))
);

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools((set) => ({
    user: null,
    setUser: (data) => set(() => ({ user: data })),
    clearUser: () => set(() => ({ user: null })),
  }))
);

export const useFavoritesStore = create<FavoritesState & FavoritesAction>()(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],
        addToFav: (data) =>
          set((state) => ({ favorites: [...get().favorites, data] })),
        removeFromFav: (id) =>
          set((state) => ({
            favorites: state.favorites.filter(
              (item: Teacher) => item.id !== id
            ),
          })),
      }),
      {
        name: 'lingo-favorites',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        current: 'theme1',
        setTheme: (theme) => set({ current: theme }),
      }),
      {
        name: 'lingo-theme',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
