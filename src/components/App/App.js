import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
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

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sales, setSales] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isPopupRepairOpened, setIsPopupRepairOpened] = useState(false);
  const [buildMode, setBuildMode] = useState(false);
  const [productsToBuild, setProductsToBuild] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateResponseLoading, setIsUpdateResponseLoading] = useState(false);
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getProducts(), api.getSales()])
      .then(([salesData, productData]) => {
        setSales(salesData);
        setCards(productData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      Promise.all([api.getUserData(token), api.getUserOrders(token), api.getUserApplications(token)])
        .then(([userData, ordersData, applicationsData]) => {
          setCurrentUser(userData);
          setOrders(ordersData);
          setApplications(applicationsData);
          setCart(userData.cart);
          setFavorites(userData.favorites);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [])

  function handleSearchClick(searchValue) {
    const wordsArray = searchValue.split(' ');
    const tempCards = [];

    cards.forEach((item) => {
      let numberOfMatches = 0;

      wordsArray.forEach((word) => {
        if (item.productName.includes(word)) {
          numberOfMatches += 1;
        }
      });

      if (numberOfMatches > 0) {
        tempCards.push(item);
      }
    });

    setFoundCards(tempCards);
    navigate('/search');
  }

  function handleRepairSubmit({ description, contact, fileNames }) {
    api.createApplication(description, contact, fileNames/* isGuest, token */)
      .then(res => {
        setIsPopupRepairOpened(true);
        setApplications([...applications, { ...res, id: applications.length + 1 }]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAllPopupsClose() {
    setIsPopupRepairOpened(false);
  }

  function handleUserUpdate(phone, email, name, lastName) {
    /* const token = localStorage.getItem('jwt');
    if (token) { */

    /* сабмит на сервер */

    /* } */
  }

  function handleLikeClick(newCard) {
    const token = localStorage.getItem('jwt');

    if (token) {
      api.changeFavorite(newCard.id, false, token)
      .then((userData) => {
        setCurrentUser(userData);
        setFavorites([...favorites, newCard]);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  function handleDislikeClick(card) {
    api.changeFavorite(card.id, true)
      .then((userData) => {
        setCurrentUser(userData);
        setFavorites(favorites.filter((item) => !(item === card)));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddToCartClick(newCard) {
    api.addToCart(newCard)
      .then((userData) => {
        setCurrentUser(userData);
        const card = userData.cart.find((item) => item.cardId === newCard.id);
        setCart([...cart, card]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleRemoveFromCart(cardId) {
    api.deleteFromCart(cardId)
      .then((userData) => {
        setCurrentUser(userData);
        setCart(cart.filter((item) => !(item.productId === cardId)));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCartClear() {
    api.clearCart()
      .then((userData) => {
        setCurrentUser(userData);
        setCart([]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleQuantityChange(e) {
    const id = Number(e.target.id);
    /* будет полное обновление корзины, передать id пользователя и новое значение количества */
    const { quantity } = cart.find((item) => item.productId === id);
    const newQuantity = e.target.name === 'increase' ? quantity + 1 : quantity - 1;

    api.changeProductQuantity(id, newQuantity)
      .then((userData) => {
        setCurrentUser(userData);
        const newCard = userData.cart.find((item) => item.productId === id)
        setCart(state => state.map((item) => item.id === id ? newCard : item));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleOrderCreate() {
    api.createOrder(cart)
      .then(newOrder => {
        setOrders([...orders, newOrder]);
        handleCartClear();
        navigate('/profile/orders');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleEditClick() {
    setIsEdit(true);
  }


  return (
    <div className="page">
      { (pathname !== '/signin' && pathname !== '/signup') &&
        <Header width={width} cart={cart} faves={favorites} onSearch={handleSearchClick} />
      }
      <main className={`main ${pathname === '/' ? 'main_type_white' : ''}`}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={<Main cards={cards.slice(0, 15)} pathname={pathname}
              onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
              onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />} />
            <Route path='/catalog'>
              <Route index element={<Catalog />} />
              <Route path='computer-cases' element={
                <ComputerCases name='Корпуса' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='computer-cases/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='processors' element={
                <ComputerCases name='Процессоры' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='processors/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='motherboards' element={
                <ComputerCases name='Материнские платы' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='motherboards/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='video-cards' element={
                <ComputerCases name='Видеокарты' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='video-cards/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='coolers' element={
                <ComputerCases name='Кулеры' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='coolers/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='rams' element={
                <ComputerCases name='Оперативная память' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='rams/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='power-units' element={
                <ComputerCases name='Блок питания' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='power-units/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='storages' element={
                <ComputerCases name='Хранение данных' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='storages/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='sound-boards' element={
                <ComputerCases name='Звуковые карты' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='sound-boards/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='peripheral' element={
                <ComputerCases name='Периферия' cards={cards} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
              <Route path='peripheral/:id' element={
                <ProductView pathname={pathname} cards={cards} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
              } />
            </Route>
            <Route path='/repair' element={
              <Repair onRepairSubmit={handleRepairSubmit} />
            } />
            <Route path='/build' element={
              <Build cards={cards} width={width} scroll={scroll} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/sales' element={<Sales />} />
            <Route path='/sales/:id' element={
              <SaleView cards={cards} width={width} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/cart' element={
              <Cart onLike={handleLikeClick} cards={cart} faves={favorites} /* cart.map((item) => cards.find((card) => card.id === item.cardId)) */
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                onCartClear={handleCartClear}
                onQuantityChange={handleQuantityChange} />
            } />
            <Route path='/order-create' element={<OrderCreate cards={cart} onOrderCreate={handleOrderCreate} />} />
            <Route path='/favorite' element={
              <Favorite cards={favorites.map((item) => cards.find((card) => card.id === item))} faves={favorites} width={width} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/search' element={} />
            <Route path='/profile' >
              <Route index element={<Profile title='Профиль' pathname={pathname}>
                <UserData isEdit={isEdit} isLoading={isUpdateResponseLoading} onEditClick={handleEditClick} />
              </Profile>} />
              <Route path='orders' element={<Profile title='Заказы' pathname={pathname}> <Orders orders={orders} /> </Profile>} />
              <Route path='orders/:id' element={
                <Profile title='Заказы' pathname={pathname}>
                  <OrderView cards={orders} pathname={pathname} />
                </Profile>} />
              <Route path='applications' element={
                <Profile title='Заявки на ремонт' pathname={pathname}>
                  <Applications apps={applications} />
                </Profile>
              } />
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
