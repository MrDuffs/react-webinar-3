const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Генерация случайного и уникального кода для элемента списка
 * @param list {Object} передаваемый список записей
 * @returns {number}
 */
export function generateCode(list) {
  const listLength = list.length;

  let randomCode = Math.floor(Math.random() * (listLength + 2));

  if (!randomCode || list.some(item => item.code === randomCode)) {
    randomCode = generateCode(list);
  }

  return randomCode;
}

/**
 * Генерация генерация выделенного заголовка
 * @param title {string} основной заголовок
 * @param count {number} число выделенного элемента
 * @returns {string}
 */
export function generateSelectedTitle(title, count) {
  let ending = count % 100;

  if (ending >= 12 && ending <= 14) {
    return `${title} | Выделяли ${count} раз`;
  }

  ending = count % 10;
  if (ending >= 2 &&  ending <= 4) {
    return `${title} | Выделяли ${count} раза`;
  }

  return `${title} | Выделяли ${count} раз`;
}