import { useCheckerStore } from '../store/checkerStore';
import { useState } from 'react';

interface CheckResult {
  id: string;
  label: string;
  passed: boolean | null;
  detail?: string;
}

function parseHTML(html: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

function AutoChecker() {
  const operator = useCheckerStore((state) => state.operator);
  const [code, setCode] = useState('');
  const [results, setResults] = useState<CheckResult[]>([]);

  const check = () => {
    const doc = parseHTML(code);
    const results: CheckResult[] = [];

    // 1. Мета viewport
    const viewport = doc.querySelector('meta[name="viewport"]');
    const viewportContent = viewport?.getAttribute('content') || '';
    results.push({
      id: 'viewport',
      label: 'user-scalable=no в мета теге',
      passed: viewportContent.includes('user-scalable=no'),
      detail: viewportContent || 'мета viewport не найден',
    });

    // 2. Чек-бокс
    const checkbox = doc.querySelector('input[type="checkbox"]');
    results.push({
      id: 'checkbox',
      label: 'Чек-бокс input[type="checkbox"] присутствует',
      passed: !!checkbox,
    });

    // 3. data-btn атрибут (A1)
    if (operator === 'a1') {
      const dataBtnEl = doc.querySelector('[data-btn]');
      results.push({
        id: 'data-btn',
        label: 'Кнопка имеет атрибут data-btn (A1)',
        passed: !!dataBtnEl,
      });
    }

    // 4. Слово ПОДПИСАТЬСЯ на кнопке
    const buttons = doc.querySelectorAll('button, [data-btn], .button, .btn');
    const hasSubscribe = Array.from(buttons).some((btn) =>
      btn.textContent?.toUpperCase().includes('ПОДПИСАТЬСЯ'),
    );
    results.push({
      id: 'btn-text',
      label: 'Слово «ПОДПИСАТЬСЯ» на кнопке',
      passed: hasSubscribe,
    });

    // 5. Внешние скрипты
    const externalScripts = doc.querySelectorAll('script[src^="http"]');
    results.push({
      id: 'no-external-scripts',
      label: 'Нет внешних скриптов (script src="http...")',
      passed: externalScripts.length === 0,
      detail: externalScripts.length > 0 ? `Найдено: ${externalScripts.length}` : undefined,
    });

    // 6. Внешние стили
    const externalStyles = doc.querySelectorAll('link[href^="http"]');
    results.push({
      id: 'no-external-styles',
      label: 'Нет внешних CSS (link href="http...")',
      passed: externalStyles.length === 0,
      detail: externalStyles.length > 0 ? `Найдено: ${externalStyles.length}` : undefined,
    });

    // 7. Alt у изображений
    const images = doc.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter((img) => !img.hasAttribute('alt'));
    results.push({
      id: 'img-alt',
      label: 'У всех изображений есть alt атрибут',
      passed: imagesWithoutAlt.length === 0,
      detail: imagesWithoutAlt.length > 0 ? `Без alt: ${imagesWithoutAlt.length} шт.` : undefined,
    });

    // 8. xmlns в SVG
    const svgWithXmlns = doc.querySelectorAll('svg[xmlns]');
    results.push({
      id: 'no-svg-xmlns',
      label: 'Нет xmlns атрибута в SVG',
      passed: svgWithXmlns.length === 0,
      detail: svgWithXmlns.length > 0 ? `SVG с xmlns: ${svgWithXmlns.length} шт.` : undefined,
    });

    // 9. file:/// пути
    const allSrc = doc.querySelectorAll('[src]');
    const filePaths = Array.from(allSrc).filter((el) =>
      el.getAttribute('src')?.startsWith('file:///'),
    );
    results.push({
      id: 'no-file-paths',
      label: 'Нет путей file:/// в src',
      passed: filePaths.length === 0,
      detail: filePaths.length > 0 ? `Найдено: ${filePaths.length}` : undefined,
    });

    // 10. Ссылка Выйти
    const links = doc.querySelectorAll('a');
    const exitLink = Array.from(links).find(
      (a) =>
        a.textContent?.trim().toLowerCase().includes('выйти') ||
        a.textContent?.trim().toLowerCase().includes('назад'),
    );
    results.push({
      id: 'exit-link',
      label: 'Ссылка «Выйти» / «Назад» присутствует',
      passed: !!exitLink,
    });

    // 11. Знак 18+
    const bodyText = doc.body?.textContent || '';
    results.push({
      id: 'age-sign',
      label: 'Знак «18+» присутствует на странице',
      passed: bodyText.includes('18+'),
    });

    // 12. Товарный знак оператора в title/URL
    if (operator === 'a1') {
      const title = doc.querySelector('title')?.textContent || '';
      results.push({
        id: 'no-brand',
        label: 'Нет товарного знака A1 в заголовке страницы',
        passed: !title.toLowerCase().includes('a1'),
        detail: title || undefined,
      });
    }

    setResults(results);
  };

  if (!operator) {
    return <div className="checklist__empty">Выберите оператора</div>;
  }

  const passed = results.filter((r) => r.passed === true).length;
  const failed = results.filter((r) => r.passed === false).length;

  return (
    <div className="colorchecker">
      <p className="colorchecker__hint">
        Вставь HTML код лендинга — инструмент автоматически проверит основные требования{' '}
        {operator.toUpperCase()}
      </p>

      <textarea
        className="colorchecker__textarea"
        placeholder="Вставь HTML код лендинга..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="colorchecker__btn" onClick={check}>
        Проверить
      </button>

      {results.length > 0 && (
        <div className="colorchecker__results">
          <div className="colorchecker__stats">
            <span className="colorchecker__ok">✅ {passed} прошло</span>
            <span className="colorchecker__fail">❌ {failed} не прошло</span>
          </div>

          <div className="colorchecker__grid">
            {results.map((r) => (
              <div
                key={r.id}
                className={`colorchecker__item ${r.passed ? 'colorchecker__item--ok' : 'colorchecker__item--fail'}`}>
                <span style={{ fontSize: 16 }}>{r.passed ? '✅' : '❌'}</span>
                <div style={{ flex: 1 }}>
                  <div className="colorchecker__hex" style={{ fontFamily: 'inherit' }}>
                    {r.label}
                  </div>
                  {r.detail && (
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{r.detail}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AutoChecker;
