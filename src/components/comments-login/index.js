import { memo, useLayoutEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function CommentsLogin({padding, ...props}) {
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
      <div className={cn({padding})}>
        {isBelowComment
          ? (
            <>
              <button className={cn('link')} onClick={props.onSignIn}>Войдите</button>
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
                <button className={cn('link')} onClick={props.onSignIn}>Войдите</button>
                , чтобы иметь возможность комментировать
              </>
            )
        }
      </div>
  );
}

CommentsLogin.propTypes = {
  exactCommentId: PropTypes.string,
  onCancel: PropTypes.func,
  onSignIn: PropTypes.func,
  padding: PropTypes.oneOf(['reply'])
}

CommentsLogin.defaultProps = {
  onCancel: () => {},
  onSignIn: () => {},
  exactCommentId: ''
}

export default memo(CommentsLogin);
