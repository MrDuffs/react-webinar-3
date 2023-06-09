import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import dateFormat from '../../utils/date-format';
import './style.css';
import CommentsForm from '../comments-form';
import CommentsLogin from '../comments-login';

function ItemComment(
    {
      item,
      isAuth,
      userId,
      exactCommentId,
      onChangeCommentId,
      onChangeComment,
      onSubmitComment
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
        { exactCommentId === item._id &&
            (
              isAuth
                ? <CommentsForm
                    onChange={onChangeComment}
                    onSubmit={onSubmitComment}
                  />
                : <CommentsLogin
                    exactCommentId={exactCommentId}
                    onCancel={onChangeCommentId}
                  />
            )
        }
        {item.children.length > 0
          && (
            <div className={item.parent._tree.length < 10 ? cn('reply') : ''}>
              {item.children.map((childComment) => (
                <ItemComment
                    key={childComment._id}
                    item={childComment}
                    isAuth={isAuth}
                    userId={userId}
                    exactCommentId={exactCommentId}
                    onChangeCommentId={onChangeCommentId}
                />
              ))}
            </div>
          )
        }
      </div>
  );
}

export default memo(ItemComment);
