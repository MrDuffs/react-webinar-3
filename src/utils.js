/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function createTreeFromList(list) {
  const hashTable = Object.create(null);
  const dataTree = [];

  for (const item of list) {
    hashTable[item._id] = {...item, childNodes: []};
  }

  for (const item of list) {
    if (item.parent && item.parent._id) {
      hashTable[item.parent._id].childNodes.push(hashTable[item._id]);
    } else {
      dataTree.push(hashTable[item._id]);
    }
  }

  return dataTree;
}

export function getOptionsList(list, subLevel = 0) {
  const result = [];

  for (const item of list) {
    result.push({value: item._id, title: '- '.repeat(subLevel) + item.title});
    if (item.childNodes.length) {
      result.push(...getOptionsList(item.childNodes, subLevel + 1));
    }
  }

  return result;
}
