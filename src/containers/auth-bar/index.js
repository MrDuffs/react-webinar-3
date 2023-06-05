import { memo, useCallback } from 'react';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';
import useStore from '../../hooks/use-store';
import AuthMenu from '../../components/auth-menu';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import { useNavigate } from 'react-router-dom';

function AuthBar() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    userName: state.login.userName,
    isAuth: state.login.isAuth,
    waiting: state.login.waiting
  }));

  useInit(() => {
    store.actions.login.checkAuth();
  }, [], true);

  const callbacks = {
    // Выход из аккаунта
    onLogOut: useCallback(() => {
      store.actions.login.logOut();
      store.actions.profile.removeUser();
      navigate('/login');
    }, [store])
  };

  const {t} = useTranslate();

  return (
    <SideLayout side='end' padding='px10_py15' border='bottom'>
      <Spinner active={select.waiting}>
        <AuthMenu userName={select.userName} onLogOut={callbacks.onLogOut} t={t}/>
      </Spinner>
    </SideLayout>
  );
}

export default memo(AuthBar);
