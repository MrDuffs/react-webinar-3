import React from "react";
import PropTypes from 'prop-types';
import './style.css';



function Controls({list, setModalActive}){
  return (
    <div className='Controls'>
      <div className="Controls-cart">
        В корзине:&nbsp;
        <span className="Controls-info">
          {list.length ? (
            list.length + ' товара' + ' / ' + list.reduce((sum, item) => sum + item.price * item.count, 0) + ' ₽'
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
