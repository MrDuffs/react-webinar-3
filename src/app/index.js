import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from './profile';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const select = useSelector(state => ({
    userData: state.login.userData,
  }));

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={select.userData ? <Navigate to='/profile'/> : <Login/>} />
        <Route path={'/profile'} element={!select.userData ? <Navigate to='/login'/> : <Profile/>} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
