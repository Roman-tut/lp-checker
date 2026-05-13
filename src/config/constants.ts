export const OPERATORS = [
  { id: 'a1', label: 'BY — A1' },
  { id: 'mts', label: 'BY — MTS' },
  { id: 'life', label: 'BY — LIFE' },
  { id: 'beeline', label: 'RU — Билайн' },
] as const;

export type OperatorId = (typeof OPERATORS)[number]['id'];

export const THEMES = [
  { id: 'adult', label: 'Адалт' },
  { id: 'music', label: 'Музыка' },
  { id: 'games', label: 'Игры' },
  { id: 'education', label: 'Обучение' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];
