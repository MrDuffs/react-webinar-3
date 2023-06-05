import StoreModule from "../module";

/**
 * Состояние категории - параметры фильтра категории
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false
    }
  }

  async fetchCategories() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    this.setState(
        {
          ...this.getState(),
          categories: json.result.items,
          waiting: false
        },
        'Загружен список категорий из АПИ',
    );
  }
}

export default CategoriesState;
