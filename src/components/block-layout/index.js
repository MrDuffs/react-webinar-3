import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function BlockLayout({children}) {

  const cn = bem('BlockLayout');

  return (
      <div className={cn()}>
        {children}
      </div>
  );
}

BlockLayout.propTypes = {
  children: PropTypes.node
}

export default memo(BlockLayout);
