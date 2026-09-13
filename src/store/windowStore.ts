import { create } from 'zustand';

export interface AppWindow {
  id: string;
  title: string;
  component: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowState {
  windows: AppWindow[];
  activeWindowId: string | null;
  openWindow: (id: string, title: string, component: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: [],
  activeWindowId: null,
  openWindow: (id, title, component) =>
    set((state) => {
      const exists = state.windows.find((w) => w.id === id);
      const maxZ = Math.max(0, ...state.windows.map((w) => w.zIndex));
      if (exists) {
        return {
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
          ),
          activeWindowId: id,
        };
      }
      return {
        windows: [
          ...state.windows,
          { id, title, component, isOpen: true, isMinimized: false, isMaximized: false, zIndex: maxZ + 1 },
        ],
        activeWindowId: id,
      };
    }),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    })),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)),
    })),
  focusWindow: (id) =>
    set((state) => {
      const maxZ = Math.max(0, ...state.windows.map((w) => w.zIndex));
      return {
        windows: state.windows.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w)),
        activeWindowId: id,
      };
    }),
}));
