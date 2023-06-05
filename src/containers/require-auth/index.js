import { memo } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';

function RequireAuth({children}) {
  const store = useStore();
  const location = useLocation();

  useInit(() => {
    store.actions.profile.loadUser();
  }, [], true);

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    waiting: state.profile.waiting,
  }));


  if (!select.waiting && !select.isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node
};

RequireAuth.defaultProps = {
  // redirectUrl: '/profile'
}

export default memo(RequireAuth);
