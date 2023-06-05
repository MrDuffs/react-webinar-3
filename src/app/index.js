import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from './profile';
import RequireAuth from '../containers/require-auth';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();

  useInit(() => {
    store.actions.login.checkAuth();
  }, [], true);

  const isAuth = useSelector(state => state.login.isAuth);

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route
          path={'/login'}
          element={
            <RequireAuth isAuth={isAuth} redirectUrl={'/profile'}>
              <Login/>
            </RequireAuth>
          }
        />
        <Route
          path={'/profile'}
          element={
            <RequireAuth isAuth={!isAuth} redirectUrl={'/login'}>
              <Profile/>
            </RequireAuth>
          }
        />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
