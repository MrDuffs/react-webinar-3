import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Title({children}){
  return (
      <div className='Title'>
        {children}
      </div>
  )
}

Title.propTypes = {
  children: PropTypes.node,
};

export default memo(Title);
