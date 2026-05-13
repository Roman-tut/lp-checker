import { useCheckerStore } from '../store/checkerStore';
import a1Rules from '../rules/a1/rules.json';
import mtsRules from '../rules/mts/rules.json';
import lifeRules from '../rules/life/rules.json';
import type { RulesConfig, ChecklistItem, RuleCategory } from '../validator/types';

function getChecklistItems(operator: string): ChecklistItem[] {
  let data: { rules: RulesConfig };
  if (operator === 'a1') data = a1Rules as unknown as { rules: RulesConfig };
  else if (operator === 'mts') data = mtsRules as unknown as { rules: RulesConfig };
  else data = lifeRules as unknown as { rules: RulesConfig };

  const items: ChecklistItem[] = [];
  const groups: { key: RuleCategory; label: string }[] = [
    { key: 'structure_rules', label: 'Структура LP' },
    { key: 'button_rules', label: 'Кнопка' },
    { key: 'archive_rules', label: 'Архив' },
    { key: 'font_rules', label: 'Шрифты' },
    { key: 'css_rules', label: 'CSS (глобально)' },
  ];

  groups.forEach(({ key, label }) => {
    const rules = data.rules[key];
    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        items.push({
          id: rule.id,
          text: rule.description,
          critical: rule.critical,
          category: label,
        });
      });
    }
  });
  return items;
}

function Checklist() {
  const operator = useCheckerStore((state) => state.operator);
  const checkedItems = useCheckerStore((state) => state.checkedItems);
  const toggleItem = useCheckerStore((state) => state.toggleItem);
  const resetChecklist = useCheckerStore((state) => state.resetChecklist);

  if (!operator) {
    return <div className="checklist__empty">Выберите оператора</div>;
  }
  const items = getChecklistItems(operator);

  // группируем по категориям
  const grouped = items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const total = items.length;
  const checked = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="checklist">
      <div className="checklist__header">
        <span className="checklist__progress">
          {checked} / {total}
        </span>
        <button className="checklist__reset" onClick={resetChecklist}>
          Сбросить
        </button>
      </div>

      <div className="checklist__progress-bar">
        <div
          className="checklist__progress-fill"
          style={{ width: `${(checked / total) * 100}%` }}
        />
      </div>

      {Object.entries(grouped).map(([category, categoryItems]) => (
        <div key={category} className="checklist__category">
          <h3 className="checklist__category-title">{category}</h3>
          {categoryItems.map((item) => (
            <label
              key={item.id}
              className={`checklist__item ${checkedItems[item.id] ? 'checklist__item--checked' : ''} ${item.critical ? 'checklist__item--critical' : ''}`}>
              <input
                type="checkbox"
                checked={!!checkedItems[item.id]}
                onChange={() => toggleItem(item.id)}
              />
              <span className="checklist__item-text">{item.text}</span>
              {item.critical && <span className="checklist__item-badge">!</span>}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Checklist;
