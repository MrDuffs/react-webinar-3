import StoreModule from '../module';

class Product extends StoreModule {

  initState() {
    return {
      item: {}
    };
  }

  async loadProduct(productId) {
    const response = await fetch(`/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result,
    }, 'Загружен продукт из АПИ');
  }
}

export default Product;
