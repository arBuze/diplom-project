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

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();

  return (
    <div className="page">
      <Header width={width} />
      <main className="main">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={<Main pathname={pathname} />} />
            <Route path='/catalog'>
              <Route index element={<Catalog />} />
              <Route path='computer-cases' element={
                <ComputerCases name='Корпуса'cards={cards} width={width} scroll={scroll} pathname={pathname} />
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
              <Route path='monitors' element={
                <ComputerCases name='Мониторы' cards={cards} width={width} scroll={scroll} pathname={pathname} />
              } />
              <Route path='monitors/:id' element={
                <ProductView pathname={pathname} cards={cards} />
              } />
            </Route>
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </CurrentUserContext.Provider>
      </main>
      <Footer />
      <TopButton scroll={scroll} />
    </div>
  );
}

export default App;
