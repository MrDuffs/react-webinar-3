import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function AuthMenu({user, onLogOut, t}) {
  const cn = bem('AuthMenu');

  return (
      <div className={cn()}>
        {user
            ? (
                <>
                  <Link className={cn('profile-link')} to='/profile'>
                    {user.profile?.name}
                  </Link>
                  <Link to='/'>
                    <button className={cn('logOut')} onClick={onLogOut}>{t('auth.logOut')}</button>
                  </Link>
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
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.object
  }),
  logOut: PropTypes.func,
  t: PropTypes.func
};

AuthMenu.defaultProps = {
  logOut: () => {},
  t: (text) => text
}

export default memo(AuthMenu);
