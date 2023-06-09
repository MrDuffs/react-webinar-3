import { memo, useLayoutEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentsForm(props) {
  const [value, setValue] = useState(props.value);

  // Обработчик изменений в поле
  const onHandleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('CommentsForm');

  return (
      <div className={cn()}>
        <div className={cn('title')}>Новый комментарий</div>
        <textarea
            className={cn('textarea')}
            placeholder='Текст'
            value={value}
            onChange={onHandleChange}
        />
        <button onClick={props.onSubmit}>Отправить</button>
      </div>
  );
}

CommentsForm.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

CommentsForm.defaultProps = {
  onChange: () => {},
  value: ''
}

export default memo(CommentsForm);
