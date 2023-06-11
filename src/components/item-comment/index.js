import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import CommentsForm from '../comments-form';
import CommentsLogin from '../comments-login';
import PropTypes from 'prop-types';
import './style.css';

function ItemComment(
    {
      item,
      isAuth,
      userId,
      exactCommentId,
      onChangeCommentId,
      onChangeComment,
      onSubmitComment,
      onSignIn
    }
) {

  const cn = bem('ItemComment');

  return (
      <div className={cn()}>
        <div className={cn('header')}>
          <span
              className={userId === item.author._id ? cn('author') + '_active' : cn('author')}
          >
            {item.author?.profile?.name}
          </span>
          <span className={cn('date')}>{dateFormat(item.dateCreate)}</span>
        </div>
        <div className={cn('text')}>{item.text}</div>
        <button
            className={cn('button-reply')}
            onClick={() => onChangeCommentId(item._id)}
        >
          Ответить
        </button>
        {item.children.length > 0 &&
          (
            <div
                className={item.parent._tree.length < 10 ? cn('reply') : cn('reply_last')}
            >
              {item.children.map((childComment) => (
                <ItemComment
                    key={childComment._id}
                    item={childComment}
                    isAuth={isAuth}
                    userId={userId}
                    exactCommentId={exactCommentId}
                    onChangeCommentId={onChangeCommentId}
                    onChangeComment={onChangeComment}
                    onSubmitComment={onSubmitComment}
                    onSignIn={onSignIn}
                />
              ))}
            </div>
          )
        }
        {exactCommentId === item._id &&
            (
                isAuth
                    ? <CommentsForm
                        id={item._id}
                        onChange={onChangeComment}
                        onSubmitComment={onSubmitComment}
                        exactCommentId={exactCommentId}
                        onCancel={onChangeCommentId}
                        padding='reply'
                    />
                    : <CommentsLogin
                        padding='reply'
                        exactCommentId={exactCommentId}
                        onCancel={onChangeCommentId}
                        onSignIn={onSignIn}
                    />
            )
        }
      </div>
  );
}

ItemComment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    parent: PropTypes.shape({
      _tree: PropTypes.array
    }),
    dateCreate: PropTypes.string,
    children: PropTypes.array
  }).isRequired,
  isAuth: PropTypes.bool,
  userId: PropTypes.string,
  exactCommentId: PropTypes.string,
  onChangeCommentId: PropTypes.func,
  onChangeComment: PropTypes.func,
  onSubmitComment: PropTypes.func,
  onSignIn: PropTypes.func
};

ItemComment.defaultProps = {
  onChangeCommentId: () => {},
  onChangeComment: () => {},
  onSubmitComment: () => {},
  onSignIn: () => {}
}

export default memo(ItemComment);
