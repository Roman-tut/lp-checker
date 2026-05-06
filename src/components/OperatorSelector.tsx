import { useCheckerStore } from '../store/checkerStore';

const operators = [
  { id: 'a1', label: 'BY — A1' },
  { id: 'mts', label: 'BY — MTS' },
  { id: 'life', label: 'BY — LIFE' },
];

const themes = [
  { id: 'adult', label: 'Адалт' },
  { id: 'music', label: 'Музыка' },
  { id: 'games', label: 'Игры' },
  { id: 'education', label: 'Обучение' },
];

function OperatorSelector() {
  const operator = useCheckerStore((state) => state.operator);
  const theme = useCheckerStore((state) => state.theme);
  const url = useCheckerStore((state) => state.url);
  const setOperator = useCheckerStore((state) => state.setOperator);
  const setTheme = useCheckerStore((state) => state.setTheme);
  const setUrl = useCheckerStore((state) => state.setUrl);

  return (
    <div className="selector">
      <div className="selector__row">
        <div className="selector__group">
          <label className="selector__label">Оператор</label>
          <div className="selector__buttons">
            {operators.map((op) => (
              <button
                key={op.id}
                className={`selector__btn ${operator === op.id ? 'selector__btn--active' : ''}`}
                onClick={() => setOperator(op.id as 'a1' | 'mts')}>
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="selector__group">
          <label className="selector__label">Тематика</label>
          <div className="selector__buttons">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`selector__btn ${theme === t.id ? 'selector__btn--active' : ''}`}
                onClick={() => setTheme(t.id as 'adult' | 'music' | 'games' | 'education')}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="selector__group">
        <label className="selector__label">URL лендинга</label>
        <input
          className="selector__input"
          type="text"
          placeholder="https://твой-лендинг.vercel.app"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
}

export default OperatorSelector;
