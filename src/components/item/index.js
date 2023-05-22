import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { priceFormatter } from '../../utils';

function Item(props){

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAddItemToCart(props.item.code);
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItemFromCart(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {priceFormatter.format(props.item.price)} ₽
      </div>
      {props.item.count ? (
        <div className='Item-count'>
          {props.item.count} шт
        </div>
      ) : null}
      <div className='Item-buttons'>
        {props.item.count ? (
            <button className='delete' onClick={callbacks.onDelete}>
              Удалить
            </button>
        ) : (
            <button onClick={callbacks.onAdd}>
              Добавить
            </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func,
  onDeleteItemFromCart: PropTypes.func
};

Item.defaultProps = {
  onAddItemToCart: () => {},
  onDeleteItemFromCart: () => {},
}

export default React.memo(Item);
