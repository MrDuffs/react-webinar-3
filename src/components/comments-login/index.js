import { memo, useLayoutEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function CommentsLogin(props) {
  const [isBelowComment, setIsBelowComment] = useState(props.exactCommentId);

  const onHandleClick = () => {
    props.onCancel('');
  }

  // Обновление стейта, если передан новый value
  useLayoutEffect(
    () => setIsBelowComment(props.exactCommentId), [props.exactCommentId]
  );

  const cn = bem('CommentsLogin');

  return (
      <div className={cn()}>
        {isBelowComment
          ? (
            <>
              <Link className={cn('link')} to={'/login'}>Войдите</Link>
              , чтобы иметь возможность комментировать.
              <button
                  className={cn('cancel')}
                  onClick={onHandleClick}
              >
                Отмена
              </button>
            </>
          ) : (
              <>
                <Link className={cn('link')} to={'/login'}>Войдите</Link>
                , чтобы иметь возможность комментировать
              </>
            )
        }
      </div>
  );
}

CommentsLogin.propTypes = {
  exactCommentId: PropTypes.string,
  onCancel: PropTypes.func
}

CommentsLogin.defaultProps = {
  onCancel: () => {},
  exactCommentId: ''
}

export default memo(CommentsLogin);
