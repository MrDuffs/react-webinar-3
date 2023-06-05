import { memo } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function RequireAuth({isAuth, redirectUrl, children}) {

  return isAuth ? <Navigate to={redirectUrl} /> : children;
}

RequireAuth.propTypes = {
  isAuth: PropTypes.bool,
  redirectUrl: PropTypes.string,
  children: PropTypes.node
};

export default memo(RequireAuth);
