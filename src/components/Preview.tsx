import { useCheckerStore } from '../store/checkerStore';

function Preview() {
  const url = useCheckerStore((state) => state.url);

  if (!url) {
    return <div className="preview__empty">Вставьте URL лендинга чтобы увидеть превью</div>;
  }

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <span className="preview__url">{url}</span>
        <a href={url} target="_blank" rel="noreferrer" className="preview__open">
          Открыть в новой вкладке ↗
        </a>
      </div>
      <iframe className="preview__frame" src={url} title="LP Preview" />
    </div>
  );
}

export default Preview;
