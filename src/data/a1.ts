export interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  critical: boolean; // критичное замечание = красный, обычное = жёлтый
}

export const a1Checklist: ChecklistItem[] = [
  // Шрифты
  {
    id: 'font-family',
    category: 'Шрифты',
    text: 'Шрифт Arial во всех блоках (хедер, футер, кнопки)',
    critical: true,
  },
  {
    id: 'font-header',
    category: 'Шрифты',
    text: 'Размер шрифта хедера/футера/Выйти — не менее 13px',
    critical: true,
  },
  {
    id: 'font-btn-step1',
    category: 'Шрифты',
    text: 'Размер шрифта кнопки 1 шага — не менее 14px',
    critical: true,
  },
  {
    id: 'font-btn-step2',
    category: 'Шрифты',
    text: 'Размер шрифта кнопки активации — не менее 20px',
    critical: true,
  },

  // Кнопка
  {
    id: 'btn-text',
    category: 'Кнопка',
    text: 'Кнопка содержит слово «ПОДПИСАТЬСЯ»',
    critical: true,
  },
  {
    id: 'btn-border',
    category: 'Кнопка',
    text: 'Граница кнопки контрастная к фону',
    critical: true,
  },
  {
    id: 'btn-clickarea',
    category: 'Кнопка',
    text: 'Кликабельная область не выходит за границы кнопки (скругления)',
    critical: true,
  },
  {
    id: 'btn-width',
    category: 'Кнопка',
    text: 'Ширина кнопки не более 80% от ширины LP',
    critical: true,
  },
  {
    id: 'btn-height',
    category: 'Кнопка',
    text: 'Высота кнопки не более 25% от высоты LP',
    critical: false,
  },
  { id: 'btn-one', category: 'Кнопка', text: 'Кнопка активации одна на странице', critical: true },

  // Чек-бокс
  {
    id: 'checkbox-exists',
    category: 'Чек-бокс',
    text: 'Чек-бокс присутствует на 1 шаге',
    critical: true,
  },
  {
    id: 'checkbox-auto',
    category: 'Чек-бокс',
    text: 'Галочка не проставляется автоматически',
    critical: true,
  },
  {
    id: 'checkbox-link',
    category: 'Чек-бокс',
    text: 'Текст чек-бокса содержит ссылку на правила',
    critical: true,
  },
  {
    id: 'checkbox-18',
    category: 'Чек-бокс',
    text: '18+: текст «и мне есть 18 лет» в чек-боксе',
    critical: true,
  },

  // Ссылки
  { id: 'links-underline', category: 'Ссылки', text: 'Все ссылки подчёркнуты', critical: true },
  {
    id: 'links-color',
    category: 'Ссылки',
    text: 'Ссылки не синего цвета по умолчанию браузера',
    critical: true,
  },
  {
    id: 'links-header-clickable',
    category: 'Ссылки',
    text: 'Ссылки в хедере кликабельны',
    critical: true,
  },

  // Структура
  {
    id: 'exit-btn',
    category: 'Структура',
    text: 'Кнопка «Выйти» ведёт на https://www.google.by/',
    critical: true,
  },
  {
    id: 'age-sign',
    category: 'Структура',
    text: 'Знак 18+ в верхней части страницы, жирный, не меньше основного текста',
    critical: true,
  },
  {
    id: 'no-scroll',
    category: 'Структура',
    text: 'Нет скроллинга — всё помещается на экран 320×480',
    critical: true,
  },
  {
    id: 'adaptive',
    category: 'Структура',
    text: 'LP адаптируется под размер экрана',
    critical: true,
  },
  {
    id: 'unique-bg',
    category: 'Структура',
    text: 'Уникальное фоновое изображение',
    critical: false,
  },

  // Архив
  { id: 'archive-zip', category: 'Архив', text: 'Формат архива — zip', critical: true },
  {
    id: 'archive-svg',
    category: 'Архив',
    text: 'SVG только через base64 (inline)',
    critical: true,
  },
  {
    id: 'archive-no-external',
    category: 'Архив',
    text: 'Нет внешних скриптов и ссылок',
    critical: true,
  },
  {
    id: 'archive-structure',
    category: 'Архив',
    text: 'Структура: index.html + папки js, css, images',
    critical: true,
  },
  {
    id: 'archive-aliases',
    category: 'Архив',
    text: 'Все алиасы заведены: {{cost}}, {{conditions}}, {{reject}}, {{servicelink}}',
    critical: true,
  },
  {
    id: 'archive-no-a1-brand',
    category: 'Архив',
    text: 'Нет товарного знака A1 в названии/URL',
    critical: true,
  },
  {
    id: 'archive-no-favicon-a1',
    category: 'Архив',
    text: 'Фавикон не содержит логотип A1',
    critical: false,
  },

  // Цвета
  {
    id: 'colors-palette',
    category: 'Цвета',
    text: 'Цвета текста и фона из палитры оператора (п.5 требований)',
    critical: true,
  },
  {
    id: 'colors-bg-solid',
    category: 'Цвета',
    text: 'Фон хедера, футера, кнопки Выйти — однотонный',
    critical: true,
  },

  // Малые экраны
  {
    id: 'small-320-480',
    category: 'Малые экраны',
    text: 'Кнопка не обрезается на 320×480',
    critical: true,
  },
  {
    id: 'small-font-btn1',
    category: 'Малые экраны',
    text: 'Шрифт кнопки 1 шага ≥14px на 320×480 и 320×568',
    critical: true,
  },
  {
    id: 'small-font-btn2',
    category: 'Малые экраны',
    text: 'Шрифт кнопки активации ≥20px на 320×480 и 320×568',
    critical: true,
  },
];
