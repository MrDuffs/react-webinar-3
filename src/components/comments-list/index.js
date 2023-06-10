import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentList({list, renderItem}){

  return (
      <div className='CommentList'>
        {list.map(item =>
          <div key={item._id} className='CommentList-item'>
            {renderItem(item)}
          </div>
        )}
      </div>
  )
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

CommentList.defaultProps = {
  renderItem: (item) => {},
}

export default memo(CommentList);
