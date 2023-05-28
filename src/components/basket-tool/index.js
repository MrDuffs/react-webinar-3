import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from 'react-router-dom';

function BasketTool({sum, amount, onOpen, onChangePage}) {
  const cn = bem('BasketTool');

  const callbacks = {
    onChangePage: () => onChangePage(1)
  };

  return (
    <div className={cn()}>
      <div className={cn('link')}>
        <Link to='/' onClick={callbacks.onChangePage}>Главная</Link>
      </div>
      <div className={cn('actions')}>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
        {amount
            ? `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
            : `пусто`
        }
      </span>
        <button onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onChangePage: PropTypes.func,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  onChangePage: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
