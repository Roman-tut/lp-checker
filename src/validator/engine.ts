import a1Rules from '../rules/a1/rules.json';
import mtsRules from '../rules/mts/rules.json';
import lifeRules from '../rules/life/rules.json';
import beelineRules from '../rules/beeline/rules.json';
import {
  type BaseRule,
  type ValidationResult,
  type CSSValidationResult,
  type ValidationReport,
  type RulesConfig,
} from './types';

// Загружаем нужный rules.json по оператору
function getRules(operator: string) {
  if (operator === 'a1') return a1Rules;
  if (operator === 'mts') return mtsRules;
  if (operator === 'life') return lifeRules;
  if (operator === 'beeline') return beelineRules;
  throw new Error(`Неизвестный оператор: ${operator}`);
}

// Парсим HTML строку в DOM
function parseHTML(html: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

// Извлекаем все font-size значения из CSS
function extractFontSizes(css: string): number[] {
  const regex = /font-size\s*:\s*(\d+(?:\.\d+)?)(px|pt|rem|em)/gi;
  const matches = [...css.matchAll(regex)];
  return matches.filter((m) => m[2].toLowerCase() === 'px').map((m) => parseFloat(m[1]));
}

// Извлекаем все font-family значения из CSS
function extractFontFamilies(css: string): string[] {
  const regex = /font-family\s*:\s*([^;]+)/gi;
  const matches = [...css.matchAll(regex)];
  return matches.map((m) => m[1].trim().toLowerCase());
}

// Извлекаем все HEX цвета из CSS
function extractHexColors(css: string): string[] {
  const regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  const matches = css.match(regex) || [];
  const unique = [
    ...new Set(
      matches.map((c) => {
        let hex = c.toLowerCase().replace('#', '');
        if (hex.length === 3) {
          hex = hex
            .split('')
            .map((ch) => ch + ch)
            .join('');
        }
        return hex;
      }),
    ),
  ];
  return unique;
}

// Проверяем одно HTML правило
function checkRule(rule: BaseRule, doc: Document): ValidationResult {
  // Ручная проверка
  if (rule.manual) {
    return {
      id: rule.id,
      description: rule.description,
      passed: false,
      critical: rule.critical,
      manual: true,
      detail: 'Требует ручной проверки',
    };
  }

  // must_exist — элемент должен существовать
  if (rule.must_exist !== undefined) {
    const el = doc.querySelector(rule.selector!);
    return {
      id: rule.id,
      description: rule.description,
      passed: !!el,
      critical: rule.critical,
      detail: el ? undefined : `Элемент не найден: ${rule.selector}`,
    };
  }

  // must_not_exist — элемент не должен существовать
  if (rule.must_not_exist !== undefined) {
    const els = doc.querySelectorAll(rule.selector!);
    return {
      id: rule.id,
      description: rule.description,
      passed: els.length === 0,
      critical: rule.critical,
      detail: els.length > 0 ? `Найдено: ${els.length} шт.` : undefined,
    };
  }

  // text_contains — текст содержит строку
  if (rule.text_contains !== undefined) {
    const els = doc.querySelectorAll(rule.selector!);
    const found = Array.from(els).some((el) =>
      el.textContent?.toLowerCase().includes(rule.text_contains!.toLowerCase()),
    );
    return {
      id: rule.id,
      description: rule.description,
      passed: found,
      critical: rule.critical,
      detail: found ? undefined : `Текст "${rule.text_contains}" не найден`,
    };
  }

  // text_contains_any — текст содержит хотя бы одно из слов
  if (rule.text_contains_any !== undefined) {
    const els = doc.querySelectorAll(rule.selector!);
    const found = Array.from(els).some((el) =>
      rule.text_contains_any!.some((word) =>
        el.textContent?.toLowerCase().includes(word.toLowerCase()),
      ),
    );
    return {
      id: rule.id,
      description: rule.description,
      passed: found,
      critical: rule.critical,
      detail: found ? undefined : 'Ни одно из допустимых слов не найдено на кнопке',
    };
  }

  // attr_contains — атрибут содержит значение
  if (rule.attr_contains !== undefined) {
    const el = doc.querySelector(rule.selector!);
    const attrValue = el?.getAttribute(rule.attr_contains.attr) || '';
    const passed = attrValue.includes(rule.attr_contains.value);
    return {
      id: rule.id,
      description: rule.description,
      passed,
      critical: rule.critical,
      detail: passed ? undefined : `Атрибут содержит: "${attrValue}"`,
    };
  }

  // all_must_have_attr — все элементы должны иметь атрибут
  if (rule.all_must_have_attr !== undefined) {
    const els = doc.querySelectorAll(rule.selector!);
    const without = Array.from(els).filter((el) => !el.hasAttribute(rule.all_must_have_attr!));
    return {
      id: rule.id,
      description: rule.description,
      passed: without.length === 0,
      critical: rule.critical,
      detail: without.length > 0 ? `Без атрибута: ${without.length} шт.` : undefined,
    };
  }

  return {
    id: rule.id,
    description: rule.description,
    passed: false,
    critical: rule.critical,
    detail: 'Тип проверки не поддерживается',
  };
}

// Главная функция валидатора HTML
export function validate(html: string, operator: string): ValidationReport {
  const rules = getRules(operator);
  const doc = parseHTML(html);

  const allRules: BaseRule[] = [
    ...rules.rules.structure_rules,
    ...rules.rules.button_rules,
    ...rules.rules.archive_rules,
    ...rules.rules.font_rules,
  ];

  const results = allRules.map((rule) => checkRule(rule, doc));

  const passed = results.filter((r) => r.passed && !r.manual).length;
  const failed = results.filter((r) => !r.passed && !r.manual).length;
  const manual = results.filter((r) => r.manual).length;

  return {
    operator,
    total: results.length,
    passed,
    failed,
    manual,
    results,
  };
}

// Главная функция валидатора CSS
export function validateCSS(css: string, operator: string): CSSValidationResult[] {
  const rules = getRules(operator);
  const cssRules = (rules.rules as unknown as RulesConfig).css_rules as BaseRule[];
  const results: CSSValidationResult[] = [];

  const colorPairs = rules.rules.color_pairs as { text: string; background: string }[];
  const allowedColors = [
    ...new Set([...colorPairs.map((p) => p.text), ...colorPairs.map((p) => p.background)]),
  ];

  for (const rule of cssRules) {
    //ручная проверка конпки по ширине

    if (rule.manual) {
      results.push({
        id: rule.id,
        description: rule.description,
        passed: false,
        critical: rule.critical,
        manual: true,
        detail: 'Требует ручной проверки',
      });
      continue;
    }

    // check_palette — проверяем цвета по палитре
    if (rule.check_palette) {
      const foundColors = extractHexColors(css);
      const invalidColors = foundColors.filter((c) => !allowedColors.includes(c));
      results.push({
        id: rule.id,
        description: rule.description,
        passed: invalidColors.length === 0,
        critical: rule.critical,
        detail:
          invalidColors.length > 0
            ? `Вне палитры: ${invalidColors.map((c) => '#' + c).join(', ')} — проверь вручную`
            : undefined,
      });
      continue;
    }

    // font-family — проверяем шрифт
    if (rule.property === 'font-family' && rule.must_contain) {
      const fontFamilies = extractFontFamilies(css);
      const nonArial = fontFamilies.filter(
        (f) =>
          !f.includes(rule.must_contain!.toLowerCase()) &&
          !f.includes('sans-serif') &&
          !f.includes('inherit') &&
          !f.includes('initial'),
      );
      results.push({
        id: rule.id,
        description: rule.description,
        passed: nonArial.length === 0,
        critical: rule.critical,
        detail:
          nonArial.length > 0 ? `Другие шрифты: ${nonArial.slice(0, 3).join(', ')}` : undefined,
      });
      continue;
    }

    // font-size — проверяем минимальный размер
    if (rule.property === 'font-size' && rule.min_px) {
      const fontSizes = extractFontSizes(css);
      const tooSmall = fontSizes.filter((s) => s < rule.min_px!);
      results.push({
        id: rule.id,
        description: rule.description,
        passed: tooSmall.length === 0,
        critical: rule.critical,
        detail:
          tooSmall.length > 0
            ? `Слишком маленькие: ${[...new Set(tooSmall)].join('px, ')}px`
            : undefined,
      });
      continue;
    }

    results.push({
      id: rule.id,
      description: rule.description,
      passed: false,
      critical: rule.critical,
      detail: 'Тип CSS проверки не поддерживается',
    });
  }

  return results;
}
