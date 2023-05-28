import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'style.css';

function NavigationMenu({onChangePage}) {

  const cn = bem('Navigation');

  const callbacks = {
    onChangePage: () => onChangePage(1)
  };

  return (
      <div className={cn()}>
        <div className={cn('links')}>
          <Link to='/' className={cn('link')} onClick={callbacks.onChangePage}>Главная</Link>
        </div>
      </div>
  );
}

NavigationMenu.propTypes = {
  children: PropTypes.node,
  onChangePage: PropTypes.func,
};

NavigationMenu.defaultProps = {
  onChangePage: () => {},
};

export default memo(NavigationMenu);