import type { OperatorId, ThemeId } from '../config/constants';

// Тип одного правила
export interface BaseRule {
  id: string;
  description: string;
  critical: boolean;
  selector?: string;
  manual?: boolean;
  must_exist?: boolean;
  must_not_exist?: boolean;
  text_contains?: string;
  text_contains_any?: string[];
  href_contains?: string;
  attr_contains?: {
    attr: string;
    value: string;
  };
  all_must_have_attr?: string;
  property?: string;
  must_contain?: string;
  min_px?: number;
  max_percent?: number;
  check_palette?: boolean;
  selector_comment?: string;
}

// Тип одного результата проверки
export interface ValidationResult {
  id: string;
  description: string;
  passed: boolean;
  critical: boolean;
  detail?: string;
  manual?: boolean;
}

// Тип результата CSS проверки
export interface CSSValidationResult {
  id: string;
  description: string;
  passed: boolean;
  critical: boolean;
  detail?: string;
  manual?: boolean;
}

// Тип итогового отчёта
export interface ValidationReport {
  operator: string;
  total: number;
  passed: number;
  failed: number;
  manual: number;
  results: ValidationResult[];
}
export interface RulesConfig {
  css_rules?: BaseRule[];
  structure_rules: BaseRule[];
  button_rules: BaseRule[];
  archive_rules: BaseRule[];
  color_pairs: { text: string; background: string }[];
  font_rules: BaseRule[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  critical: boolean;
  category: string;
}

export type RuleCategory =
  | 'structure_rules'
  | 'button_rules'
  | 'archive_rules'
  | 'font_rules'
  | 'css_rules';

export interface CheckerStore {
  operator: OperatorId | null;
  theme: ThemeId | null;
  url: string;
  checkedItems: Record<string, boolean>;
  setOperator: (op: OperatorId | null) => void;
  setTheme: (theme: ThemeId | null) => void;
  setUrl: (url: string) => void;
  toggleItem: (id: string) => void;
  resetChecklist: () => void;
}
