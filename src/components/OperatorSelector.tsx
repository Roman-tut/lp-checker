import { useCheckerStore } from '../store/checkerStore';

import { OPERATORS, THEMES } from '../config/constants';

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
            {OPERATORS.map((op) => (
              <button
                key={op.id}
                className={`selector__btn ${operator === op.id ? 'selector__btn--active' : ''}`}
                onClick={() => setOperator(op.id)}>
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="selector__group">
          <label className="selector__label">Тематика</label>
          <div className="selector__buttons">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`selector__btn ${theme === t.id ? 'selector__btn--active' : ''}`}
                onClick={() => setTheme(t.id)}>
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
