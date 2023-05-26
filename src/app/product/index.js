import { memo, useCallback, useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useStore from '../../store/use-store';
import BasketTool from '../../components/basket-tool';
import useSelector from '../../store/use-selector';
import ProductInfo from '../../components/product-info';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader';

function Product() {
  const [isLoading, setIsLoading] = useState(true);

  const store = useStore();

  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      await store.actions.product.loadProduct(productId);
      setIsLoading(false);
    }
    fetchData();
  }, [productId]);

  const select = useSelector(state => ({
    item: state.product.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    modal: state.modals.name
  }));

  useEffect(() => {
    if (select.modal) {
      callbacks.closeModal();
    }
  }, [productId])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <PageLayout>
      <Head title={isLoading ? 'Загрузка...' : select.item.title} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {isLoading
        ? <Loader />
        : <ProductInfo item={select.item} onAdd={callbacks.addToBasket}/>
      }
    </PageLayout>
  );
}

export default memo(Product);