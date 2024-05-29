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
import { linkMatches } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PopupFeed from '../PopupFeed/PopupFeed';

export default function Client() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sales, setSales] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isPopupRepairOpened, setIsPopupRepairOpened] = useState(false);
  const [isPopupPasOpen, setIsPopupPasOpened] = useState(false);
  const [isPopupFeedOpen, setIsPopupFeedOpen] = useState(false);
  const [buildMode, setBuildMode] = useState(false);
  const [productsToBuild, setProductsToBuild] = useState([]);
  const [toBuild, setToBuild] = useState(false);
  /* const [searchValue, setSearchValue] = useState(''); */
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdateResponseLoading, setIsUpdateResponseLoading] = useState(false);
  const { width } = useWindowDimensions();
  const { pathname } = useLocation();
  const scroll = useVerticalScroll();
  const navigate = useNavigate();

  /* получение данных пользователя */
  useEffect(() => {
    const token = localStorage.getItem('user');
    console.log('in', token);
    if (token) {
      console.log('ini');
      Promise.all([api.getUserData(), api.getUserOrders(), api.getUserApplications()])
        .then(([userData, ordersData, applicationsData]) => {
          setCurrentUser(userData);
          console.log(ordersData, userData);
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

  /* получение товаров и акций */
  useEffect(() => {
    Promise.all([api.getProducts(), api.getSales(), api.getFeedbacks()])
      .then(([productData, salesData, feedData]) => {
        setSales(salesData);
        setCards(productData.reverse());
        setFeedbacks(feedData.filter((item) => item.approved));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

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
          localStorage.removeItem('user');
        })
    }
  }, [])

  useEffect(() => {
    const buildMode = localStorage.getItem('buildMode');
    if (buildMode) {
      setBuildMode(true);
      const build = localStorage.getItem('build');
      const buildProd = localStorage.getItem('buildProd');
      if (build) {
        setToBuild(build);
      }
      if (buildProd) {
        setProductsToBuild(JSON.parse(buildProd));
      }
    }
  }, [])

  useEffect(() => {
    const search = localStorage.getItem('founds');

    if (search && pathname === '/search') {
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
      .then(app => {
        setIsPopupRepairOpened(true);
        setApplications([app, ...applications]);
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
    setIsPopupFeedOpen(false);
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

  function handleLike(id) {
    api.changeFavorite(id, false)
      .then((userData) => {
        setCurrentUser(userData);
        setFavorites([id, ...favorites]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* добавление в избранное */
  function handleLikeClick(id) {
    const token = localStorage.getItem('user');

    if (token) {
      handleLike(id);
    } else {
      auth.register({ isGuest: true })
        .then((user) => {
          setCurrentUser(user);
          handleAuthorize(user);
          handleLike(id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  /* удаление из избранного */
  function handleDislikeClick(id) {
    const token = localStorage.getItem('user');

    if (token) {
      api.changeFavorite(id, true)
      .then((userData) => {
        setCurrentUser(userData);
        setFavorites(favorites.filter((item) => !(item === id)));
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
        const card = userData.cart.find((item) => item.productId === newCard._id);
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
      api.deleteFromCart(cart.find((item) => item.productId === cardId))
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
      const id = e.target.id;
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

  function handleOrderCreate(phone, email, payment, toBuild) {
    api.createOrder(cart, phone, email, currentUser.isGuest, payment, toBuild)
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
  function handleOrderCheck(phone, email, payment) {
    const token = localStorage.getItem('user');

    if (token) {
      handleOrderCreate(phone, email, payment, toBuild);
    } else {
      auth.register({ isGuest: true })
        .then((user) => {
          setCurrentUser(user);
          handleAuthorize(user);
          handleOrderCreate(phone, email, payment, toBuild);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function handleEditClick() {
    setIsEdit(true);
  }

  function handleBuildStart() {
    setBuildMode(true);
    localStorage.setItem('buildMode', true);
    navigate('/catalog/computer-cases');
  }

  function handleToBuild() {
    setToBuild(!toBuild);
    localStorage.setItem('build', !toBuild);
  }

  function handleBuildCancel() {
    setBuildMode(false);
    localStorage.setItem('buildMode', false);
    localStorage.removeItem('build');
    localStorage.removeItem('buildProd');
    setToBuild(false);
    setProductsToBuild([]);
  }

  function handleAddToBuild(isInBuild, card) {
    if (isInBuild) {
      const newArray = productsToBuild.filter((item) => item.productId === card._id);
      setProductsToBuild(newArray);
      localStorage.setItem('buildProd', JSON.stringify(newArray));
    } else {
      const category = productsToBuild.find((item) => item.category === card.category);
      if (category) {
        setProductsToBuild(state => state.map((item) => item.category === card.category ? card : item));
        localStorage.setItem('buildProd', JSON.stringify(state => state.map((item) => item.category === card.category ? card : item)));
      } else {
        setProductsToBuild([...productsToBuild, card]);
        localStorage.setItem('buildProd', JSON.stringify([...productsToBuild, card]));
      }
    }
  }

  function handleBuildConfirm() {
    productsToBuild.forEach((item) => {
      handleAddToCartClick(item);
    });
    setProductsToBuild([]);
    setBuildMode(false);
  }

  function handleFeedSend(rating, pluses, minuses, comment) {
    const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
    let name = '';
    if (currentUser.lastName) {
      name = name + currentUser.lastName + ' ';
    }
    name += currentUser.name;

    api.createFeedback(id, rating, comment, name, pluses, minuses)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFeedOpen() {
    setIsPopupFeedOpen(true);
  }

  function handleAuthorize(data) {
    const userData = {
      id: data.user._id,
      isGuest: data.user.isGuest,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    if (!data.isGuest) {
      setLoggedIn(true);
    }
  }

  /* выход из профиля */
  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('user');
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
            <Route path='/' element={<Main cards={cards} pathname={pathname}
              onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
              onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
              onSearch={handleSearchClick} />} />
            <Route path='/catalog'>
              <Route index element={<Catalog cards={cards} />} />
              <Route path='computer-cases' element={
                <ComputerCases name='Корпуса' cards={cards.filter((item) => item.category === 'computer-cases')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} toBuild={toBuild} />
              } />
              <Route path='computer-cases/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'computer-cases')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='processors' element={
                <ComputerCases name='Процессоры' cards={cards.filter((item) => item.category === 'processors')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='processors/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'processors')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='motherboards' element={
                <ComputerCases name='Материнские платы' cards={cards.filter((item) => item.category === 'motherboards')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='motherboards/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'motherboards')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='video-cards' element={
                <ComputerCases name='Видеокарты' cards={cards.filter((item) => item.category === 'video-cards')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='video-cards/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'video-cards')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='coolers' element={
                <ComputerCases name='Кулеры' cards={cards.filter((item) => item.category === 'coolers')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='coolers/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'coolers')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='rams' element={
                <ComputerCases name='Оперативная память' cards={cards.filter((item) => item.category === 'rams')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='rams/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'rams')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='power-units' element={
                <ComputerCases name='Блок питания' cards={cards.filter((item) => item.category === 'power-units')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='power-units/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'power-units')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='storages' element={
                <ComputerCases name='Хранение данных' cards={cards.filter((item) => item.category === 'storages')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='storages/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'storages')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='sound-boards' element={
                <ComputerCases name='Звуковые карты' cards={cards.filter((item) => item.category === 'sound-boards')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='sound-boards/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'sound-boards')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
              <Route path='peripheral' element={
                <ComputerCases name='Периферия' cards={cards.filter((item) => item.category === 'peripheral')} width={width} scroll={scroll} pathname={pathname}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isBuild={buildMode} onBuildAdd={handleAddToBuild}
                  onBuildConfirm={handleBuildConfirm} onBuildCancel={handleBuildCancel}
                  buildProducts={productsToBuild} onBuild={handleToBuild} />
              } />
              <Route path='peripheral/:id' element={
                <ProductView pathname={pathname} cards={cards.filter((item) => item.category === 'peripheral')} faves={favorites} cart={cart}
                  onLike={handleLikeClick} onCartAdd={handleAddToCartClick}
                  onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart}
                  isLoggedIn={loggedIn} onFeedOpen={handleFeedOpen} />
              } />
            </Route>
            <Route path='/repair' element={
              <Repair onRepairSubmit={handleRepairCheck} />
            } />
            <Route path='/build' element={
              <Build onBuildStart={handleBuildStart} toBuild={toBuild} onBuild={handleToBuild} />
            } />
            <Route path='/sales' element={<Sales sales={sales} pathname={pathname} />} />
            <Route path='/sales/:id' element={
              <SaleView cards={cards.filter((item) => item.category === 'video-cards')} width={width} pathname={pathname}
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
              <Favorite cards={favorites.map((item) => cards.find((card) => card._id === item))} faves={favorites} width={width} pathname={pathname}
                onLike={handleLikeClick} onCartAdd={handleAddToCartClick} cart={cart}
                onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/search' element={
              <ComputerCases cards={foundCards} width={width} scroll={scroll} pathname={pathname}
              onLike={handleLikeClick} onCartAdd={handleAddToCartClick} faves={favorites} cart={cart}
              onDislike={handleDislikeClick} onCartRemove={handleRemoveFromCart} />
            } />
            <Route path='/profile' >
              <Route index element={
                <ProtectedRoute element={Profile} loggedIn={loggedIn} path={'/signin'}
                  title='Профиль' pathname={pathname} onSignOut={handleSignOut}
                  children={<UserData isEdit={isEdit} isLoading={isUpdateResponseLoading}
                  onEditClick={handleEditClick} onDataUpdate={handleUserUpdate}
                  onPasswordChangeClick={handlePopupPasOpen} />} />
              } />
              <Route path='orders' element={
                <ProtectedRoute element={Profile} loggedIn={loggedIn} path={'/signin'}
                  title='Заказы' pathname={pathname} onSignOut={handleSignOut}
                  children={<Orders orders={orders} />} />
              } />
              <Route path='orders/:id' element={
                <ProtectedRoute element={Profile} loggedIn={loggedIn} path={'/signin'}
                  title='Заказы' pathname={pathname} onSignOut={handleSignOut}
                  children={<OrderView cards={orders} pathname={pathname} />} />
              } />
              <Route path='applications' element={
                <ProtectedRoute element={Profile} loggedIn={loggedIn} path={'/signin'}
                  title='Заявки на ремонт' pathname={pathname} onSignOut={handleSignOut}
                  children={<Applications apps={applications} />} />
              } />
            </Route>
            <Route path='/signin' element={<Login onAuth={handleAuthorize} navigate={navigate} />} />
            <Route path='/signup' element={<Register onAuth={handleAuthorize} navigate={navigate} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      </main>
      { (pathname !== '/signin' && pathname !== '/signup') &&
        <Footer />
      }
      <PopupRepair isOpened={isPopupRepairOpened} onClose={handleAllPopupsClose} />
      <PopupPassword isOpened={isPopupPasOpen} onClose={handleAllPopupsClose} />
      <PopupFeed isOpened={isPopupFeedOpen} onClose={handleAllPopupsClose} onFeedAdd={handleFeedSend} />
      <TopButton scroll={scroll} />
    </div>
  );
}
