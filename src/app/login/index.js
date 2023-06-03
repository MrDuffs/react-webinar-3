import { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import AuthBar from '../../containers/auth-bar';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    error: state.login.error
  }));

  const callbacks = {
    // Авторизация
    onSubmit:  useCallback((login, password) => store.actions.login.logIn(login, password), [store]),
  };

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm error={select.error} onSubmit={callbacks.onSubmit} t={t}/>
    </PageLayout>
  );
}

export default memo(Login);
