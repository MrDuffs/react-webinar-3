import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from './components/modal';
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalActive, setModalActive] = useState(false);

  const list = store.getState().list;
  const cartList = store.getState().cartList;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
    }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls list={cartList} setModalActive={setModalActive}/>
      <List list={list}
            onAddItemToCart={callbacks.onAddItemToCart}
      />
      <Modal cartList={cartList} active={modalActive}>
        <Head title='Корзина' active={modalActive} setActive={setModalActive}/>
        <List
            list={cartList}
            onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
