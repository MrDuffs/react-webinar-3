import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.totalCartItems = this.state.cartList.length;
    this.state.totalItemsPrice = this.state.cartList.reduce((sum, item) => sum + item.price * item.count, 0);
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Добавление записи в корзину
   * @param code
   */
  addItemToCart(code) {
    const listItem = this.state.list.find(item => item.code === code);
    const cartItem = this.state.cartList.find(item => item.code === code);

    if (cartItem) {
      this.setState({
        ...this.state,
        cartList: this.state.cartList.map(item => {
          if (item.code === code) {
            return {
              ...item,
              count: item.count + 1,
            };
          }

          return item;
        })
      })
    } else {
      this.setState({
        ...this.state,
        cartList: [
          ...this.state.cartList,
          {
            ...listItem,
            count: 1
          }
        ]
      })
    }

    this.calculateTotalPrice();
    this.updateTotalCartItems();
  };

  /**
   * Удаление записи из корзины по коду
   * @param code
   */
  deleteItemFromCart(code) {
    this.setState({
      ...this.state,
      cartList: this.state.cartList.filter(item => item.code !== code)
    })
    this.calculateTotalPrice();
    this.updateTotalCartItems();
  };

  /**
   * Подсчет суммы товаров в корзине
   */
  calculateTotalPrice() {
    this.setState({
      ...this.state,
      totalItemsPrice: this.state.cartList.reduce((sum, item) => sum + item.price * item.count, 0),
    })
  };

  /**
   * Обновление кол-ва товаров в корзине
   */
  updateTotalCartItems() {
    this.setState({
      ...this.state,
      totalCartItems: this.state.cartList.length,
    })
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }
}

export default Store;
