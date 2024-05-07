import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useVerticalScroll from '../../hooks/useVerticalScroll';
import PageNotFound from '../PageNotFound/PageNotFound';
import ComputerCases from '../ComputerCases/ComputerCases';
import AllOrders from '../AllOrders/AllOrders';
import HeaderOper from '../HeaderOper/HeaderOper';
import PopupStatus from '../PopupStatus/PopupStatus';
import { apir } from '../../utils/OperApi';

export default function Operator() {
  const [isOperatorLogged, setIsOperatorLogged] = useState(false);
  const [currentOper, setCurrentOper] = useState({});
  const [cards, setCards] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sales, setSales] = useState([]);
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();
  const navigate = useNavigate();

  function handleStatusChange() {
    setIsStatusPopupOpen(true);
  }

  function handleProductChangeClick(id) {
    navigate(`products/${id}`);
  }

  function handlePopupClose() {
    setIsStatusPopupOpen(false);
  }

  function handleProductCreate(name, description, price, category, chars, fileNames) {
    const token = localStorage.getItem('operId');

    if (token) {
      apir.createProduct(name, description, price, category, chars, fileNames)
        .then((product) => {
          setCards([...cards, product]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleProductChange(id, name, description, price, category, chars, fileNames) {
    const token = localStorage.getItem('operId');

    if (token) {
      apir.updateProduct(id, name, description, price, category, chars, fileNames)
        .then((product) => {
          setCards(state => state.map((item) => item.id === product.id ? product : item));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleProductDelete(id) {
    const token = localStorage.getItem('operId');

    if (token) {
      apir.deleteProduct(id)
        .then((res) => {
          console.log(res.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return(
    <main className="main main_oper">
      {
        (pathname !== '/oper/signin') &&
        <HeaderOper />
      }
      <Routes>
        <Route path='/oper'>
          {
            isOperatorLogged &&
            <>
              <Route index />
              <Route path='orders' element={<AllOrders orders={orders} onStatusChange={handleStatusChange} />} />
              <Route path='applications' />
              <Route path='products' element={
                <ComputerCases name='Все товары' cards={cards}
                  width={width} scroll={scroll} pathname={pathname}
                  onChangeClick={handleProductChangeClick} />
              } />
              <Route path='products/:id' />
              <Route path='create-product' />
              <Route path='create-sale' />
            </>
          }
          <Route path='signin' />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
      <PopupStatus isOpen={isStatusPopupOpen} onClose={handlePopupClose} />
    </main>
  );
}
