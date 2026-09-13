import { create } from 'zustand';

interface SystemState {
  theme: 'dark' | 'light';
  language: string;
  volume: number;
  startMenuOpen: boolean;
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: string) => void;
  setVolume: (vol: number) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  theme: 'dark',
  language: 'en',
  volume: 50,
  startMenuOpen: false,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setVolume: (volume) => set({ volume }),
  toggleStartMenu: () => set((state) => ({ startMenuOpen: !state.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),
}));
