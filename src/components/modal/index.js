import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { priceFormatter } from '../../utils';

function Modal({totalItemsPrice, active, children}) {
  return (
    <div className={active ? 'Modal active' : 'Modal'}>
      <div className="Modal-content">
        {children}
        <div className="Modal-total">
          Итого <span>
            {totalItemsPrice ? priceFormatter.format(totalItemsPrice) + ' ₽' : 'пусто'}
          </span>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  cartList: PropTypes.array,
  active: PropTypes.bool,
  children: PropTypes.node
}

export default React.memo(Modal);