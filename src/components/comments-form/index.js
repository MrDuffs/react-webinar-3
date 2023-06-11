import { memo, useLayoutEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentsForm({padding}, ...props) {
  const [value, setValue] = useState(props.value);
  const [isBelowComment] = useState(props.exactCommentId);

  // Обработчик изменений в поле
  const onHandleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  const onHandleSubmit = () => {
    if (value) {
      isBelowComment
          ? props.onSubmitComment(value, {_id: props.id, _type: 'comment'})
          : props.onSubmitComment(value, {_id: props.id, _type: 'article'})
    }
  };

  const onHandleClick = () => {
    props.onCancel('');
    setValue('');
  }

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('CommentsForm');

  return (
      <div className={cn({padding})}>
        <div className={cn('title')}>
          {isBelowComment ? 'Новый ответ' : 'Новый комментарий'}
        </div>
        <textarea
            className={cn('textarea')}
            value={value}
            onChange={onHandleChange}
        />
        <div className={cn('button-group')}>
          <button onClick={onHandleSubmit}>Отправить</button>
          {isBelowComment &&
              <button onClick={onHandleClick}>Отмена</button>
          }
        </div>
      </div>
  );
}

CommentsForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmitComment: PropTypes.func,
  padding: PropTypes.oneOf(['reply']),
}

CommentsForm.defaultProps = {
  onChange: () => {},
  onSubmitComment: () => {},
  value: ''
}

export default memo(CommentsForm);
