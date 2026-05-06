import { create } from 'zustand';

type Operator = 'a1' | 'mts' | 'life' | null;
type Theme = 'adult' | 'music' | 'games' | 'education' | null;

interface CheckerStore {
  operator: Operator;
  theme: Theme;
  url: string;
  checkedItems: Record<string, boolean>;
  setOperator: (op: Operator) => void;
  setTheme: (theme: Theme) => void;
  setUrl: (url: string) => void;
  toggleItem: (id: string) => void;
  resetChecklist: () => void;
}

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
