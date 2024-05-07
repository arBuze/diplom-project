import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useVerticalScroll from '../../hooks/useVerticalScroll';
import { CurrentUserContext } from '../../contexts/CurrentUserContexts';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Catalog from '../Catalog/Catalog';
import Footer from '../Footer/Footer';
import ComputerCases from '../ComputerCases/ComputerCases';
import TopButton from '../TopButton/TopButton';
import ProductView from '../ProductView/ProductView';
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
import Applications from '../Applications/Applications';
import PopupPassword from '../PopupPassword/PopupPassword';
import { api } from '../../utils/Api';
import { auth } from '../../utils/AuthApi';
import { cards, linkMatches } from '../../utils/constants';

export default function Client() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  /* const [cards, setCards] = useState([]); */
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sales, setSales] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isPopupRepairOpened, setIsPopupRepairOpened] = useState(false);
  const [isPopupPasOpen, setIsPopupPasOpened] = useState(false);
  const [buildMode, setBuildMode] = useState(false);
  const [productsToBuild, setProductsToBuild] = useState([]);
  /* const [searchValue, setSearchValue] = useState(''); */
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateResponseLoading, setIsUpdateResponseLoading] = useState(false);
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();
  const navigate = useNavigate();

  /* получение товаров и акций */
/*   useEffect(() => {
    Promise.all([api.getProducts(), api.getSales()])
      .then(([productData, salesData]) => {
        setSales(salesData);
        setCards(productData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []) */

  /* проверка токена */
  useEffect(() => {
    const token = localStorage.getItem('user');

    if (token) {
      auth.checkToken()
        .then((res) => {
          if (res) {
            if (!res.isGuest) {
              setLoggedIn(true);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
        })
    }
  }, [])

  /* получение данных пользователя */
  useEffect(() => {
    const token = localStorage.getItem('user');

    if (token) {
      Promise.all([api.getUserData(), api.getUserOrders(), api.getUserApplications()])
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
  }, [loggedIn])

  useEffect(() => {
    const search = localStorage.getItem('founds');

    if (search) {
      console.log(search);
      handleSearchClick(search);
    }
  }, [])

  function handlePopupPasOpen() {
    setIsPopupPasOpened(true);
  }

  /* поиск товаров по словам */
  function handleSearchClick(searchValue) {
    localStorage.setItem('founds', searchValue);
    console.log('asdasd');
    const wordsArray = searchValue.split(' ');
    const tempCards = [];

    const element = linkMatches.find((item) => searchValue.toLowerCase() === item.name.toLowerCase());
    if (element) {
      navigate(element.path);
      return;
    }

    cards.forEach((item) => {
      let numberOfMatches = 0;

      wordsArray.forEach((word) => {
        if (item.productName.toLowerCase().includes(word.toLowerCase())) {
          numberOfMatches += 1;
        }
      });

      if (numberOfMatches > 0) {
        tempCards.push(item);
      }
    });
    console.log(tempCards, 'temo');
    setFoundCards(tempCards);
    navigate('/search');
  }

  function handleRepairSubmit({ description, contact, fileNames }) {
    api.createApplication(description, contact, fileNames)
      .then(res => {
        setIsPopupRepairOpened(true);
        setApplications([...applications, { ...res, id: applications.length + 1 }]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* создание заявки */
  function handleRepairCheck({ description, contact, fileNames }) {
    const token = localStorage.getItem('user');
    if (token) {
      handleRepairSubmit({ description, contact, fileNames });
    } else {
      auth.register({ isGuest: true })
        .then((user) => {
          setCurrentUser(user);
          handleAuthorize(user);
          handleRepairSubmit({ description, contact, fileNames });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /* закрытие попапов */
  function handleAllPopupsClose() {
    setIsPopupRepairOpened(false);
    setIsPopupPasOpened(false);
  }

  /* обновление профиля */
  function handleUserUpdate(phone, email, name, lastName) {
    const token = localStorage.getItem('user');
    if (token) {
      api.updateUserData(email, phone, name, lastName)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleLike(newCard) {
    api.changeFavorite(newCard.id, false)
      .then((userData) => {
        setCurrentUser(userData);
        setFavorites([...favorites, newCard]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* добавление в избранное */
  function handleLikeClick(newCard) {
    const token = localStorage.getItem('user');

    if (token) {
      handleLike(newCard);
    } else {
      auth.register({ isGuest: true })
        .then((user) => {
          setCurrentUser(user);
          handleAuthorize(user);
          handleLike(newCard);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  /* удаление из избранного */
  function handleDislikeClick(card) {
    const token = localStorage.getItem('user');

    if (token) {
      api.changeFavorite(card.id, true)
      .then((userData) => {
        setCurrentUser(userData);
        setFavorites(favorites.filter((item) => !(item === card)));
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  function handleAddToCart(newCard) {
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

  /* добавление в корзину */
  function handleAddToCartClick(newCard) {
    const token = localStorage.getItem('user');

    if (token) {
      handleAddToCart(newCard);
    } else {
      auth.register({ isGuest: true })
        .then((user) => {
          setCurrentUser(user);
          handleAuthorize(user);
          handleAddToCart(newCard);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  /* удаление товара из корзины */
  function handleRemoveFromCart(cardId) {
    const token = localStorage.getItem('user');

    if (token) {
      api.deleteFromCart(cardId)
      .then((userData) => {
        setCurrentUser(userData);
        setCart(cart.filter((item) => !(item.productId === cardId)));
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  /* очистка корзины */
  function handleCartClear() {
    const token = localStorage.getItem('user');

    if (token) {
      api.clearCart()
      .then((userData) => {
        setCurrentUser(userData);
        setCart([]);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  /* изменение количества товара */
  function handleQuantityChange(e) {
    const token = localStorage.getItem('user');

    if (token) {
      const id = Number(e.target.id);
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
  }

  function handleOrderCreate(phone, email) {
    api.createOrder(cart, phone, email, currentUser.isGuest)
      .then(newOrder => {
        setOrders([...orders, newOrder]);
        handleCartClear();
        navigate('/profile/orders');
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* создание заказа */
  function handleOrderCheck(phone, email) {
    const token = localStorage.getItem('user');

    if (token) {
      handleOrderCreate(phone, email);
    } else {
      auth.register({ isGuest: true })
        .then((user) => {
          setCurrentUser(user);
          handleAuthorize(user);
          handleOrderCreate(phone, email);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleEditClick() {
    setIsEdit(true);
  }

  function handleAuthorize(data) {
    localStorage.setItem('user',
      JSON.stringify({
        id: data._id,
        isGuest: data.isGuest,
      })
    );
    if (!data.isGuest) {
      setLoggedIn(true);
    }
  }

  /* выход из профиля */
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    setCurrentUser({});
    setCart([]);
    setOrders([]);
    setApplications([]);
    setFavorites([]);
    auth.exit();
  }

  return (
    <div className="page">
      { (pathname !== '/signin' && pathname !== '/signup') &&
        <Header width={width} pathname={pathname}
          cart={cart} faves={favorites}
          onSearch={handleSearchClick} isLoggedIn={loggedIn} />
      }
      <main className={`main ${pathname === '/' ? 'main_type_white' : ''}`}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={<Main cards={cards.slice(0, 15)} pathname={pathname}
              onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
              onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
              onSearch={handleSearchClick} />} />
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
              <Repair onRepairSubmit={handleRepairCheck} />
            } />
            <Route path='/build' element={
              <Build cards={cards} width={width} scroll={scroll} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/sales' element={<Sales sales={sales} />} />
            <Route path='/sales/:id' element={
              <SaleView cards={cards} width={width} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/cart' element={
              <Cart onLike={handleLikeClick} cards={cart} faves={favorites}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                onCartClear={handleCartClear}
                onQuantityChange={handleQuantityChange} />
            } />
            <Route path='/order-create' element={<OrderCreate cards={cart} onOrderCreate={handleOrderCheck} />} />
            <Route path='/favorite' element={
              <Favorite cards={favorites.map((item) => cards.find((card) => card.id === item))} faves={favorites} width={width} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/search' element={
              <ComputerCases cards={foundCards} width={width} scroll={scroll} pathname={pathname}
              onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
              onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/profile' >
              <Route index element={<Profile title='Профиль' pathname={pathname} onSignOut={handleSignOut}>
                <UserData isEdit={isEdit} isLoading={isUpdateResponseLoading}
                  onEditClick={handleEditClick} onDataUpdate={handleUserUpdate}
                  onPasswordChangeClick={handlePopupPasOpen} />
              </Profile>} />
              <Route path='orders' element={<Profile title='Заказы' pathname={pathname} onSignOut={handleSignOut}>
                <Orders orders={orders} />
              </Profile>} />
              <Route path='orders/:id' element={
                <Profile title='Заказы' pathname={pathname} onSignOut={handleSignOut}>
                  <OrderView cards={orders} pathname={pathname} />
                </Profile>} />
              <Route path='applications' element={
                <Profile title='Заявки на ремонт' pathname={pathname} onSignOut={handleSignOut}>
                  <Applications apps={applications} />
                </Profile>
              } />
            </Route>
            <Route path='/signin' element={<Login onAuth={handleAuthorize} />} />
            <Route path='/signup' element={<Register onAuth={handleAuthorize} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      </main>
      { (pathname !== '/signin' && pathname !== '/signup') &&
        <Footer />
      }
      <PopupRepair isOpened={isPopupRepairOpened} onClose={handleAllPopupsClose} />
      <PopupPassword isOpened={isPopupPasOpen} onClose={handleAllPopupsClose} />
      <TopButton scroll={scroll} />
    </div>
  );
}
