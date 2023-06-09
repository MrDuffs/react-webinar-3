import { memo, useCallback, useState } from "react";
import PropTypes from 'prop-types';
import CommentsLogin from '../comments-login';
import CommentsForm from '../comments-form';
import './style.css';

function CommentList(
    {list, count, isAuth, commentValue, onChange, onSubmit, renderItem}
){
  const [exactCommentId, setExactCommentId] = useState('');

  const callbacks = {

    onCommentIdChange: useCallback(value => {
      setExactCommentId(value);
    }, []),
  };

  return (
      <div className='CommentList'>
        <div className='CommentList-title'>Комментарии ({count})</div>
        {list.map(item =>
            <div key={item._id} className='CommentList-item'>
              {renderItem(
                  item, exactCommentId, callbacks.onCommentIdChange
              )}
            </div>
        )}
        {!exactCommentId &&
          (
            isAuth
              ? <CommentsForm
                  value={commentValue}
                  onChange={onChange}
                  onSubmit={onSubmit}
              />
              : <CommentsLogin />
          )
        }
      </div>
  )
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  count: PropTypes.number,
  isAuth: PropTypes.bool,
  renderItem: PropTypes.func,
};

CommentList.defaultProps = {
  renderItem: (item) => {},
  count: 0
}

export default memo(CommentList);
