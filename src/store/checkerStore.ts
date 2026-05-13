import { create } from 'zustand';
import type { CheckerStore } from '../validator/types';

export const useCheckerStore = create<CheckerStore>((set) => ({
  operator: null,
  theme: null,
  url: '',
  checkedItems: {},
  setOperator: (operator) => set({ operator, checkedItems: {} }),
  setTheme: (theme) => set({ theme, checkedItems: {} }),
  setUrl: (url) => set({ url }),
  toggleItem: (id) =>
    set((state) => ({
      checkedItems: {
        ...state.checkedItems,
        [id]: !state.checkedItems[id],
      },
    })),
  resetChecklist: () => set({ checkedItems: {} }),
}));
