import { useState } from 'react';
import OperatorSelector from './components/OperatorSelector';
import Checklist from './components/Checklist';
import Preview from './components/Preview';
import ColorChecker from './components/ColorChecker';
import AutoChecker from './components/AutoChecker';

function App() {
  const [tab, setTab] = useState<'checklist' | 'colors' | 'auto'>('checklist');

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">LP Checker</h1>
        <p className="app__subtitle">Проверка лендингов по требованиям операторов</p>
      </header>

      <main className="app__main">
        <div className="app__top">
          <OperatorSelector />
        </div>

        <div className="app__tabs">
          <button
            className={`app__tab ${tab === 'checklist' ? 'app__tab--active' : ''}`}
            onClick={() => setTab('checklist')}>
            Чеклист
          </button>
          <button
            className={`app__tab ${tab === 'colors' ? 'app__tab--active' : ''}`}
            onClick={() => setTab('colors')}>
            Проверка цветов
          </button>
          <button
            className={`app__tab ${tab === 'auto' ? 'app__tab--active' : ''}`}
            onClick={() => setTab('auto')}>
            Авто-проверка
          </button>
        </div>

        <div className="app__content">
          <aside className="app__sidebar">
            {tab === 'checklist' && <Checklist />}
            {tab === 'colors' && <ColorChecker />}
            {tab === 'auto' && <AutoChecker />}
          </aside>

          <section className="app__preview">
            <Preview />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
