import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function AuthMenu({userName, onLogOut, t}) {
  const cn = bem('AuthMenu');

  return (
      <div className={cn()}>
        {userName
            ? (
                <>
                  <Link className={cn('profile-link')} to='/profile'>
                    {userName}
                  </Link>
                  <button className={cn('logOut')} onClick={onLogOut}>{t('auth.logOut')}</button>
                </>
            ) : (
                <Link to='/login'>
                  <button className={cn('logIn')}>{t('auth.logIn')}</button>
                </Link>
            )
        }
      </div>
  );
}

AuthMenu.propTypes = {
  userName: PropTypes.string,
  logOut: PropTypes.func,
  t: PropTypes.func
};

AuthMenu.defaultProps = {
  logOut: () => {},
  t: (text) => text
}

export default memo(AuthMenu);
