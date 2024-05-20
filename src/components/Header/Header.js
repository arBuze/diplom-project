import './Header.css';
/* import { useState } from 'react'; */
import logo from '../../images/LOGO1.svg'
import SearchForm from '../SearchForm/SearchForm';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header({ width, pathname, cart, faves, onSearch, isLoggedIn }) {
  const navigate = useNavigate();

  function handleFavClick() {
    navigate('/favorite');
  }

  function handleCartClick() {
    navigate('/cart');
  }

  function handleProfileClick() {
    if (isLoggedIn) {
      navigate('/profile');
    }
    else {
      navigate('/signin');
    }
  }

  return(
    <header className="header">
      { !pathname.includes('admin') ?
        <div className="header__container">
        { width < 1440 &&
          <div className="header__top">
            <Navigation pathname={pathname} />
          </div>
        }
        <div className="header__bottom">
          <div className="header__links">
            <Link to="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <button className="header__phone-button" type="button" />
            <p className="header__phone-number">+ 7 (999) 545-23-43</p>
          </div>
          {
            width < 1440
            ? <SearchForm additional="search-form_type_header" onSearch={onSearch}
                pathname={pathname} />
            : <Navigation pathname={pathname} />
          }
          <div className="header__profile-buttons">
            { width >= 1440 &&
              <SearchForm additional="search-form_type_header" onSearch={onSearch} />
            }
            <div className="header__favorites">
              <button className="header__fav-button" type="button" onClick={handleFavClick} />
              <span className="header__item-number">{faves.length}</span>
            </div>
            <div className="header__shopping-cart">
              <button className="header__cart-button" type="button" onClick={handleCartClick} />
              <span className="header__item-number">{cart.length}</span>
            </div>
            <div className="header__profile">
              <button className="header__profile-button" type="button" onClick={handleProfileClick} />
              {/* <span className="header__notification"></span> */}
            </div>
          </div>
        </div>
      </div>
      :
      <div className="header__container header__container_admin">
        <Navigation pathname={pathname} />
        <SearchForm additional="search-form_type_admin" onSearch={onSearch} />
      </div>
    }
    </header>
  );
};
