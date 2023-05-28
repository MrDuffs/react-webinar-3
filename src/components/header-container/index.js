import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import 'style.css';
import PropTypes from 'prop-types';

function HeaderContainer({children}) {
  const cn = bem('HeaderContainer');

  return (
      <div className={cn()}>
        {children}
      </div>
  );
}

HeaderContainer.propTypes = {
  children: PropTypes.node
};

export default memo(HeaderContainer);