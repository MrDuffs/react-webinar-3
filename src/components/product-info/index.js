import './style.css';
import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';

function ProductInfo({item, onAdd}) {
  const { description, madeIn, category, edition, price } = item;

  const cn = bem('ProductInfo');

  const callbacks = {
    onAdd: () => onAdd(item._id)
  }

  return (
      <div className={cn()}>
        <div className={cn('description')}>{description}</div>
        <div className={cn('madeIn')}>
          Страна производитель: <strong>{`${madeIn?.title} (${madeIn?.code})`}</strong>
        </div>
        <div className={cn('category')}>
          Категория: <strong>{category?.title}</strong>
        </div>
        <div className={cn('date')}>
          Год выпуска: <strong>{edition}</strong>
        </div>
        <div className={cn('price')}>
          Цена: <strong>{numberFormat(price)} ₽</strong>
        </div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
  );

}

ProductInfo.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    edition: PropTypes.number,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    })
  }).isRequired,
  onAdd: PropTypes.func
};

ProductInfo.defaultProps = {
  onAdd: () => {},
};

export default memo(ProductInfo);