import { useCallback, useState } from 'react';
import { useCheckerStore } from '../store/checkerStore';
import { validate, validateCSS } from '../validator/engine';
import { type ValidationReport, type CSSValidationResult } from '../validator/types';
import JSZip from 'jszip';

function ValidatorChecker() {
  const operator = useCheckerStore((state) => state.operator);
  const [code, setCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [cssResults, setCssResults] = useState<CSSValidationResult[]>([]); // ← не было
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const runValidation = useCallback(
    (html: string, css: string) => {
      if (!operator || !html) return;
      const result = validate(html, operator);
      setReport(result);

      if (css) {
        const cssResult = validateCSS(css, operator);
        setCssResults(cssResult);
      }
    },
    [operator],
  );

  //Обработка полученного файла
  const processFile = async (file: File) => {
    setFileName(file.name);
    setLoading(true);

    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);

      let htmlContent = '';
      let cssContent = '';

      const htmlFiles: string[] = [];

      for (const name in contents.files) {
        if (name.startsWith('__MACOSX')) continue;

        if (name.endsWith('.html') || name.startsWith('.htm')) {
          htmlFiles.push(name);
        }

        if (name.endsWith('.css')) {
          const css = await contents.files[name].async('string');
          cssContent += css + '\n';
        }
      }

      if (htmlFiles.length === 0) {
        alert('HTML-файл не найден в архиве');
        setLoading(false);
        return;
      }

      const targetHtml = htmlFiles.find((f) => f.endsWith('index.html')) || htmlFiles[0];
      htmlContent = await contents.files[targetHtml].async('string');

      setCode(htmlContent);
      setCssCode(cssContent);
      runValidation(htmlContent, cssContent);
    } catch (err) {
      alert('Ошибка при распоковке архива');
      console.error(err);
    }

    setLoading(false);
  };

  // Обработчик input[type=file]
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Drag & drop обработчики

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.zip')) {
      processFile(file);
    } else {
      alert('Перетащите ZIP-архив');
    }
  };

  const handleCheck = () => {
    if (!operator || !code) return;
    runValidation(code, cssCode);
  };

  if (!operator) {
    return <div className="checklist__empty">Выберите оператора</div>;
  }

  return (
    <div className="colorchecker">
      <p className="colorchecker__hint">
        Загрузи ZIP архив лендинга или вставь HTML вручную — валидатор проверит по правилам{' '}
        {operator.toUpperCase()}
      </p>

      <div
        className={`validator__upload ${dragOver ? 'validator__upload--active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <label className="validator__upload-label">
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          📦{' '}
          {loading
            ? 'Распаковываю...'
            : fileName
              ? fileName
              : 'Загрузить ZIP или перетащите его сюда'}
        </label>
      </div>

      <textarea
        className="colorchecker__textarea"
        placeholder="Или вставь HTML код лендинга вручную..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="colorchecker__btn" onClick={handleCheck} disabled={!code || loading}>
        Запустить валидатор
      </button>

      {report && (
        <div className="colorchecker__results">
          <div className="colorchecker__stats">
            <span className="colorchecker__ok">✅ {report.passed} прошло</span>
            <span className="colorchecker__fail">❌ {report.failed} не прошло</span>
            <span style={{ color: '#888' }}>👁 {report.manual} вручную</span>
          </div>

          <div className="colorchecker__grid">
            {report.results.map((r) => (
              <div
                key={r.id}
                className={`colorchecker__item ${
                  r.manual
                    ? 'colorchecker__item--info'
                    : r.passed
                      ? 'colorchecker__item--ok'
                      : 'colorchecker__item--fail'
                }`}>
                <span style={{ fontSize: 16 }}>{r.manual ? '👁' : r.passed ? '✅' : '❌'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{r.description}</div>
                  {r.detail && (
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{r.detail}</div>
                  )}
                  {r.critical && !r.passed && !r.manual && (
                    <div style={{ fontSize: 11, color: '#ef4444', marginTop: 2 }}>
                      ⚠️ Критичное замечание
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS результаты */}
      {cssResults.length > 0 && (
        <div className="colorchecker__results" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📄 Проверка CSS</div>
          <div className="colorchecker__grid">
            {cssResults.map((r) => (
              <div
                key={r.id}
                className={`colorchecker__item ${
                  r.manual
                    ? 'colorchecker__item--info'
                    : r.passed
                      ? 'colorchecker__item--ok'
                      : 'colorchecker__item--fail'
                }`}>
                <span style={{ fontSize: 16 }}>{r.manual ? '👁' : r.passed ? '✅' : '❌'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{r.description}</div>
                  {r.detail && (
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{r.detail}</div>
                  )}
                  {r.critical && !r.passed && !r.manual && (
                    <div style={{ fontSize: 11, color: '#ef4444', marginTop: 2 }}>
                      ⚠️ Критичное замечание
                    </div>
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

export default ValidatorChecker;
