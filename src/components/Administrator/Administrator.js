import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useVerticalScroll from '../../hooks/useVerticalScroll';
import PageNotFound from '../PageNotFound/PageNotFound';
import ComputerCases from '../ComputerCases/ComputerCases';
import AllOrders from '../AllOrders/AllOrders';
import PopupStatus from '../PopupStatus/PopupStatus';
import ProductForm from '../ProductForm/ProductForm';
import { apir } from '../../utils/OperApi';
import { api } from '../../utils/Api';

/* import { cards, orders } from '../../utils/constants'; */
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import TopButton from '../TopButton/TopButton';
import AdminLogin from '../AdminLogin/AdminLogin';
import Sales from '../Sales/Sales';
import AdminApps from '../AdminApps/AdminApps';
import Feedbacks from '../Feedbacks/Feedbacks';
import PopupCreateSale from '../PopupCreateSale/PopupCreateSale';

export default function Administrator() {
  /* const [isPageLoaded, setIsPageLoaded] = useState(false); */
  const [isAdministratorLogged, setIsAdministratorLogged] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [cards, setCards] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  /* const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false); */
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();
  const navigate = useNavigate();

  /* useEffect(() => {
    setIsPageLoaded(true);
  }, []) */

  useEffect(() => {
    const token = localStorage.getItem('adminId');

    if (token) {
      apir.checkToken()
        .then((res) => {
          if (res) {
            console.log('res', res);
            setIsAdministratorLogged(true);
          }
        })
        .catch(err => {
          localStorage.removeItem('adminId');
          setIsAdministratorLogged(false);
          navigate('/admin/signin');
          console.log(err);
        });
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('adminId');

    if (token) {
      Promise.all([apir.getAdminData(), api.getProducts(), /* api.getSales(), */ apir.getOrders(), apir.getApplications()])
      .then(([adminData, productData, /* salesData, */ ordersData, repairsData]) => {
        console.log(productData);
        /* setAdmins(adminsData); */
        setCurrentAdmin(adminData);
        setCards(productData.reverse());
       /*  setSales(salesData); */
        setOrders(ordersData.reverse());
        setApplications(repairsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isAdministratorLogged])

  function handleStatusChange(order) {
    setSelectedOrder(order);
  }

  function handleProductChangeClick(id) {
    navigate(`products/${id}`);
  }

  function handlePopupClose() {
    setSelectedOrder(null);
  }

  function handleProductCreate(name, description, price, category, chars, fileNames, articule, quantity) {
    const token = localStorage.getItem('adminId');


    if (token) {
      console.log('asdasd');
      apir.createProduct(name, description, price, category, chars, fileNames, articule, quantity)
        .then((product) => {
          setCards([product, ...cards]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleProductChange(id, name, description, price, category, chars, fileNames, articule, quantity) {
    const token = localStorage.getItem('adminId');

    if (token) {
      apir.updateProduct(id, name, description, price, category, chars, fileNames, articule, quantity)
        .then((product) => {
          setCards(state => state.map((item) => item._id === product.id ? product : item));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleProductDelete(id) {
    const token = localStorage.getItem('adminId');

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

  function handleStatusChangeClick(status) {
    const token = localStorage.getItem('adminId');

    if (token && status !== selectedOrder.status) {
      apir.updateOrderStatus(status, selectedOrder._id)
        .then((order) => {
          setOrders(state => state.map((item) => item._id === order._id ? order : item));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handlePopupClose();
        });
    }
  }

  function handleAuth() {
    setIsAdministratorLogged(true);
    navigate('/admin/orders');
  }

  return(
    <div className="page">
      {
        (pathname !== '/admin/signin') &&
        <Header width={width} pathname={pathname} />
      }
      <main className="main main_type_white main_type_admin">
        <Routes>
          {
            isAdministratorLogged ?
            <>
              <Route path='orders' element={
                <ProtectedRoute element={AllOrders} loggedIn={isAdministratorLogged} path='/admin/signin'
                  orders={orders} onStatusChange={handleStatusChange} />
              } />
              <Route path='applications' element={
                <ProtectedRoute element={AdminApps} loggedIn={isAdministratorLogged} path='/admin/signin'
                  apps={applications} />
              } />
              <Route path='products' element={
                <ProtectedRoute element={ComputerCases} loggedIn={isAdministratorLogged} path='/admin/signin'
                  name='Все товары' cards={cards}
                  width={width} scroll={scroll} pathname={pathname}
                  onChangeClick={handleProductChangeClick} />
              } />
              <Route path='products/:id' element={
                <ProtectedRoute element={ProductForm} loggedIn={isAdministratorLogged} path='/admin/signin'
                  cards={cards} pathname={pathname}
                  onProductDelete={handleProductDelete} onProductChange={handleProductChange} />
              } />
              <Route path='create-product' element={
                <ProtectedRoute element={ProductForm} loggedIn={isAdministratorLogged} path='/admin/signin'
                  pathname={pathname} onProductCreate={handleProductCreate} />
              } />
              <Route path='sales' element={
                <Sales sales={sales} pathname={pathname} />
              } />
              <Route path='feedbacks' element={<Feedbacks />} />
            </>
            : <Route element={<Navigate to={'/admin/signin'} replace />} />
          }
          <Route path='signin' element={<AdminLogin onAuth={handleAuth} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <PopupStatus onClose={handlePopupClose}
          selectedOrder={selectedOrder} onStatusChange={handleStatusChangeClick} />
        <PopupCreateSale />
      </main>
      <TopButton scroll={scroll} />
    </div>
  );
}
