import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, active, setActive}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {active ? (
          <button onClick={() => setActive(false)}>Закрыть</button>
      ) : null}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
};

export default React.memo(Head);
