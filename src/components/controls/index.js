import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural, priceFormatter } from '../../utils';



function Controls({totalCartItems, totalItemsPrice, setModalActive}){
  return (
    <div className='Controls'>
      <div className="Controls-cart">
        В корзине:&nbsp;
        <span className="Controls-info">
          {totalCartItems ? (
              totalCartItems
              + ` ${plural(totalCartItems, {one: 'товар', few: 'товара', many: 'товаров'})}`
              + ' / ' + priceFormatter.format(totalItemsPrice) + ' ₽'
          ) : 'пусто'}
        </span>
      </div>
      <button onClick={() => setModalActive(true)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    count: PropTypes.number
  })),
  setModalActive: PropTypes.func
};

Controls.defaultProps = {
  setModalActive: () => {}
}

export default React.memo(Controls);
