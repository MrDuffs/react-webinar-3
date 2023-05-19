import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({cartList, active, children}) {
  return (
    <div className={active ? 'Modal active' : 'Modal'}>
      <div className="Modal-content">
        {children}
        <div className="Modal-total">
          Итого <span>
            {cartList.reduce((sum, item) => sum + item.price * item.count, 0)} ₽
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