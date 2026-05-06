import { useCheckerStore } from '../store/checkerStore';
import { useState } from 'react';
import { a1Palette } from '../data/palettes/a1Palette';
import { mtsPalette } from '../data/palettes/mtsPalette';
import { lifePalette } from '../data/palettes/lifePalette';

function normalizeHex(hex: string): string {
  hex = hex.toLowerCase().replace('#', '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return hex;
}

function extractColors(code: string): string[] {
  const regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  const matches = code.match(regex) || [];
  const unique = [...new Set(matches.map((c) => normalizeHex(c)))];
  return unique;
}

function ColorChecker() {
  const operator = useCheckerStore((state) => state.operator);
  const [code, setCode] = useState('');
  const [results, setResults] = useState<{ hex: string; valid: boolean }[]>([]);

  const palette = operator === 'a1' ? a1Palette : operator === 'mts' ? mtsPalette : lifePalette;

  const check = () => {
    const colors = extractColors(code);
    const checked = colors.map((hex) => ({
      hex,
      valid: palette.includes(hex),
    }));
    setResults(checked);
  };
  if (!operator) {
    return <div className="checklist__empty">Выберите оператора</div>;
  }

  return (
    <div className="colorchecker">
      <p className="colorchecker__hint">
        Вставь CSS или HTML код — инструмент найдёт все HEX цвета и проверит по палитре{' '}
        {operator.toUpperCase()}
      </p>

      <textarea
        className="colorchecker__textarea"
        placeholder="Вставь сюда CSS или HTML..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="colorchecker__btn" onClick={check}>
        Проверить цвета
      </button>

      {results.length > 0 && (
        <div className="colorchecker__results">
          <div className="colorchecker__note">
            ⚠️ Палитра применяется только к цветам текста и фона в хедере, футере и кнопках.
            Остальные цвета оператором не ограничены.
          </div>

          <div className="colorchecker__stats">
            <span className="colorchecker__ok">
              ✅ {results.filter((r) => r.valid).length} из палитры
            </span>
            <span className="colorchecker__fail">
              🔍 {results.filter((r) => !r.valid).length} вне палитры
            </span>
          </div>

          <div className="colorchecker__grid">
            {results.map((r) => (
              <div
                key={r.hex}
                className={`colorchecker__item ${r.valid ? 'colorchecker__item--ok' : 'colorchecker__item--info'}`}>
                <div className="colorchecker__swatch" style={{ background: `#${r.hex}` }} />
                <span className="colorchecker__hex">#{r.hex}</span>
                <span>{r.valid ? '✅ в палитре' : '🔍 проверь вручную'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorChecker;
