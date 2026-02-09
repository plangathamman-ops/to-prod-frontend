import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark' || 
          (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches),
  
  setTheme: (isDark) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    set({ isDark });
  },
  
  toggleTheme: () => set((state) => {
    const newTheme = !state.isDark;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    return { isDark: newTheme };
  }),
}));
