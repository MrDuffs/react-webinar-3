import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import AuthBar from '../../containers/auth-bar';
import useSelector from '../../hooks/use-selector';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import ProfileCard from '../../components/profile-card';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Profile() {

  const store = useStore();

  useInit(() => {
    store.actions.profile.loadUser();
  }, [], true);

  const select = useSelector(state => ({
    userData: state.profile.userData,
    waitingUser: state.profile.waiting
  }));

  const {t} = useTranslate();

  console.log(select.userData);

  return (
      <PageLayout>
        <AuthBar/>
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation />
        <Spinner active={select.waitingUser}>
          {select.userData ? <ProfileCard user={select.userData} t={t}/> : null}
        </Spinner>
      </PageLayout>
  );
}

export default memo(Profile);
