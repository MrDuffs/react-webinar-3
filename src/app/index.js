import Main from "./main";
import Product from './product';
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path={'product/:productId'} element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
