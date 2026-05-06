import { useCheckerStore } from '../store/checkerStore';
import { a1Checklist } from '../data/a1';
import { mtsChecklist } from '../data/mts';
import { type ChecklistItem } from '../data/a1';
import { lifeChecklist } from '../data/life';

function Checklist() {
  const operator = useCheckerStore((state) => state.operator);
  const checkedItems = useCheckerStore((state) => state.checkedItems);
  const toggleItem = useCheckerStore((state) => state.toggleItem);
  const resetChecklist = useCheckerStore((state) => state.resetChecklist);

  if (!operator) {
    return <div className="checklist__empty">Выберите оператора</div>;
  }

  const items = operator === 'a1' ? a1Checklist : operator === 'mts' ? mtsChecklist : lifeChecklist;
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
