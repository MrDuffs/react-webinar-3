import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import NavigationMenu from '../../components/navigation-menu';
import HeaderContainer from '../../components/header-container';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    changePage: useCallback((page) => store.actions.catalog.changePage(page), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} route={`/product/${item._id}`}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <HeaderContainer>
        <NavigationMenu onChangePage={callbacks.changePage} />
        <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
        />
      </HeaderContainer>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        currentPage={select.currentPage}
        totalPages={select.totalPages}
        onChangePage={callbacks.changePage}
      />
    </PageLayout>

  );
}

export default memo(Main);
