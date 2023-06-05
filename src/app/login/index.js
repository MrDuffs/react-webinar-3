import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import AuthBar from '../../containers/auth-bar';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {

  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    error: state.login.error,
    waiting: state.login.waiting
  }));

  const callbacks = {
    // Авторизация
    onSubmit:  useCallback((login, password) => store.actions.login.logIn(login, password), [store]),
    // Обновление ошибки
    onSetError: useCallback((error) => store.actions.login.setError(error), [store])
  };

  useEffect(() => {
    return callbacks.onSetError('');
  }, []);

  const {t} = useTranslate();

  useEffect(() => {
    if (select.isAuth) {
      navigate(fromPage);
    }
  }, [select.isAuth]);

  return (
    <PageLayout>
      <AuthBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm
            error={select.error}
            onSubmit={callbacks.onSubmit}
            waiting={select.waiting}
            t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
