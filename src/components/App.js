import { Routes, Route, useLocation } from 'react-router-dom';
import '../index.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import ComputerCases from './ComputerCases/ComputerCases';
import useWindowDimensions from '../hooks/useWindowDimensions';
import TopButton from './TopButton/TopButton';
import useVerticalScroll from '../hooks/useVerticalScroll';
import ProductView from './ProductView/ProductView';
import { CurrentUserContext } from '../contexts/CurrentUserContexts';
import { useEffect, useState } from 'react';
import { cards } from '../utils/constants';
import Cart from './Cart/Cart';
import Favorite from './Favorite/Favorite';
import Repair from './Repair/Repair';
import Login from './Login/Login';
import Register from './Register/Register';
import PopupRepair from './PopupRepair/PopupRepair';
import Profile from './Profile/Profile';
import UserData from './UserData/UserData';
import Orders from './Orders/Orders';
import Sales from './Sales/Sales';
import SaleView from './SaleView/SaleView';
import OrderView from './OrderView/OrderView';
import Build from './Build/Build';
import PageNotFound from './PageNotFound/PageNotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupRepairOpened, setIsPopupRepairOpened] = useState(false);
  const [buildMode, setBuildMode] = useState(false);
  const [productsToBuild, setProductsToBuild] = useState([]);
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();

  function handleRepairSubmit() {
    setIsPopupRepairOpened(true);
  }

  function handleAllPopupsClose() {
    setIsPopupRepairOpened(false);
  }

  return (
    <div className="page">
      { (pathname !== '/signin' && pathname !== '/signup') &&
        <Header width={width} />
      }
      <main className="main">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={<Main pathname={pathname} />} />
            <Route path='/catalog'>
              <Route index element={<Catalog />} />
              <Route path='computer-cases' element={
                <ComputerCases name='Корпуса' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='computer-cases/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='processors' element={
                <ComputerCases name='Процессоры' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='processors/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='motherboards' element={
                <ComputerCases name='Материнские платы' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='motherboards/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='video-cards' element={
                <ComputerCases name='Видеокарты' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='video-cards/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='coolers' element={
                <ComputerCases name='Кулеры' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='coolers/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='rams' element={
                <ComputerCases name='Оперативная память' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='rams/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='power-units' element={
                <ComputerCases name='Блок питания' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='power-units/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='storages' element={
                <ComputerCases name='Хранение данных' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='storages/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='sound-boards' element={
                <ComputerCases name='Звуковые карты' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='sound-boards/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
              <Route path='peripheral' element={
                <ComputerCases name='Периферия' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='peripheral/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
            </Route>
            <Route path='/repair' element={<Repair onRepairSubmit={handleRepairSubmit} />} />
            <Route path='/build' element={<Build cards={cards} width={width} scroll={scroll} pathname={pathname} /> } />
            <Route path='/sales' element={<Sales />} />
            <Route path='/sales/:id' element={<SaleView cards={cards} width={width} pathname={pathname} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/favorite' element={<Favorite cards={cards} width={width} pathname={pathname} />} />
            <Route path='/profile' >
              <Route index element={<Profile title='Профиль' pathname={pathname}> <UserData /> </Profile>} />
              <Route path='orders' element={<Profile title='Заказы' pathname={pathname}> <Orders /> </Profile>} />
              <Route path='orders/:id' element={<Profile title='Заказы' pathname={pathname}> <OrderView /> </Profile>} />
            </Route>
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      </main>
      { (pathname !== '/signin' && pathname !== '/signup') &&
        <Footer />
      }
      <PopupRepair isOpened={isPopupRepairOpened} onClose={handleAllPopupsClose} />
      <TopButton scroll={scroll} />
    </div>
  );
}

export default App;
