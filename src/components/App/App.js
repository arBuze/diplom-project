import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
/* import Header from '../Header/Header';
import Main from '../Main/Main';
import Catalog from '../Catalog/Catalog';
import Footer from '../Footer/Footer';
import ComputerCases from '../ComputerCases/ComputerCases';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import TopButton from '../TopButton/TopButton';
import useVerticalScroll from '../../hooks/useVerticalScroll';
import ProductView from '../ProductView/ProductView';
import { CurrentUserContext } from '../../contexts/CurrentUserContexts';
import { useEffect, useState } from 'react';
import { cards } from '../../utils/constants';
import Cart from '../Cart/Cart';
import Favorite from '../Favorite/Favorite';
import Repair from '../Repair/Repair';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PopupRepair from '../PopupRepair/PopupRepair';
import Profile from '../Profile/Profile';
import UserData from '../UserData/UserData';
import Orders from '../Orders/Orders';
import Sales from '../Sales/Sales';
import SaleView from '../SaleView/SaleView';
import OrderView from '../OrderView/OrderView';
import Build from '../Build/Build';
import PageNotFound from '../PageNotFound/PageNotFound';
import OrderCreate from '../OrderCreate/OrderCreate';
import { api } from '../../utils/Api';
import Applications from '../Applications/Applications';
import { auth } from '../../utils/AuthApi';
import PopupPassword from '../PopupPassword/PopupPassword'; */
import Operator from '../Operator/Operator';
import Client from '../Client/Client';

function App() {
  return(
    <Routes>
      <Route path='/oper/*' element={<Operator />} />
      <Route path='/*' element={<Client />} />
    </Routes>
  );
}

export default App;
