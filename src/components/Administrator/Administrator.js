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
  const [feedbacks, setFeedbacks] = useState([]);
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
      Promise.all([apir.getAdminData(), api.getProducts(), /* api.getSales(), */ apir.getOrders(), apir.getApplications(), api.getFeedbacks()])
      .then(([adminData, productData, /* salesData, */ ordersData, repairsData, feedData]) => {
        console.log(productData);
        /* setAdmins(adminsData); */
        setCurrentAdmin(adminData);
        setCards(productData.reverse());
       /*  setSales(salesData); */
        setOrders(ordersData.reverse());
        setApplications(repairsData);
        console.log('ad',repairsData);
        setFeedbacks(feedData.filter((item) => !item.approved));
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

  function handleRepairStatusChange(status, id) {
    const token = localStorage.getItem('adminId');

    if (token) {
      apir.updateRepairStatus(status, id)
        .then((app) => {
          setApplications(state => state.map((item) => item._id === app._id ? app : item));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateFeedStatus(isApproved, productId, feedbackId) {
    if (isApproved) {
      apir.updateFeedbackStatus(feedbackId)
        .then((feed) => {
          setFeedbacks(feedbacks.filter((item) => !(item._id === feed._id)));
          const productFeeds = feedbacks.filter((item) => item.productId === productId && item.approved);
          const ratingSum = productFeeds.reduce((sum, item) => sum + item.rating, 0) + feed.rating;
          const rating = ratingSum / (productFeeds.length + 1);
          return apir.updateProductRating(productId, rating);
        })
        .then((product) => {
          setCards(state => state.map((item) => item._id === product._id ? product : item));
        })
        .catch((err) => console.log(err));
    } else {
      apir.deleteFeedback(feedbackId)
        .then(() => setFeedbacks.filter((item) => !(item._id === feedbackId)))
        .catch((err) => console.log(err));
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
                  apps={applications} onRepairStatusChange={handleRepairStatusChange} />
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
              <Route path='feedbacks' element={<Feedbacks feeds={feedbacks} onStatusChange={handleUpdateFeedStatus} cards={cards} />} />
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
