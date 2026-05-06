import { type ChecklistItem } from './a1';

export const lifeChecklist: ChecklistItem[] = [
  // Шрифты
  { id: 'font-family', category: 'Шрифты', text: 'Шрифт Arial во всех блоках', critical: true },
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
    text: 'Размер шрифта кнопки 2 шага — не менее 20px',
    critical: true,
  },

  // Кнопка
  {
    id: 'btn-clickarea',
    category: 'Кнопка',
    text: 'Кликабельная область вписана в пределы кнопки',
    critical: true,
  },
  { id: 'btn-one', category: 'Кнопка', text: 'Кнопка активации одна на странице', critical: true },
  {
    id: 'btn-text',
    category: 'Кнопка',
    text: 'Текст кнопки из допустимых: Смотреть, Слушать, Подписаться, Получить доступ и др.',
    critical: true,
  },
  {
    id: 'btn-border',
    category: 'Кнопка',
    text: 'Граница кнопки контрастная к фону',
    critical: true,
  },

  // Чек-бокс
  {
    id: 'checkbox-exists',
    category: 'Чек-бокс',
    text: 'Чек-бокс присутствует в зоне кнопки активации',
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

  // Структура
  {
    id: 'exit-btn',
    category: 'Структура',
    text: 'Кнопка «Выйти»/«Назад»/«Отмена»/«Вернуться» — ведёт на предыдущую страницу',
    critical: true,
  },
  {
    id: 'age-sign',
    category: 'Структура',
    text: 'Знак 18+ в верхней части, жирный, не меньше основного текста',
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
    id: 'footer-text',
    category: 'Структура',
    text: 'Футер: «Управление услугой в Личном кабинете и в приложении "Мой life:)"»',
    critical: true,
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
    id: 'archive-structure',
    category: 'Архив',
    text: 'Все файлы макета лежат в корне архива',
    critical: true,
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
    text: 'Фон хедера и футера — однотонный, без фоновых изображений',
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
    text: 'Шрифт кнопки 2 шага ≥20px на 320×480 и 320×568',
    critical: true,
  },
];
