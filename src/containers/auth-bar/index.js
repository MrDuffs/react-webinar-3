import { memo, useCallback } from 'react';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import AuthMenu from '../../components/auth-menu';
import useTranslate from '../../hooks/use-translate';

function AuthBar() {
  const store = useStore();

  useInit(() => {
    store.actions.login.loadUser();
  }, [], true);

  const select = useSelector(state => ({
    userData: state.login.userData
  }));

  const callbacks = {
    // Выход из аккаунта
    onLogOut: useCallback(() => store.actions.login.logOut(), [store])
  };

  const {t} = useTranslate();

  return (
    <SideLayout side='end' padding='px10_py15' border='bottom'>
      <AuthMenu user={select.userData} onLogOut={callbacks.onLogOut} t={t}/>
    </SideLayout>
  );
}

export default memo(AuthBar);
