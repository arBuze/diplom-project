import './Header.css';
import { useState } from 'react';
import logo from '../../images/LOGO1.svg'
import SearchForm from '../SearchForm/SearchForm';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

export default function Header({ width }) {
  return(
    <header className="header">
      <div className="header__container">
        { width < 1440 &&
          <div className="header__top">
            <Navigation />
          </div>
        }
        <div className="header__bottom">
          <div className="header__links">
            <Link to="/" className="header__logo-link">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <button className="header__phone-button" type="button"></button>
            <p className="header__phone-number">+ 7 (999) 545-23-43</p>
          </div>
          {
            width < 1440
            ? <SearchForm additional="search-form_type_header" />
            : <Navigation />
          }
          <div className="header__profile-buttons">
            { width >= 1440 &&
              <SearchForm additional="search-form_type_header" />
            }
            <div className="header__favorites">
              <button className="header__fav-button" type="button"></button>
              <span className="header__item-number">99</span>
            </div>
            <div className="header__shopping-cart">
              <button className="header__cart-button" type="button"></button>
              <span className="header__item-number">99</span>
            </div>
            <div className="header__profile">
              <button className="header__profile-button" type="button"></button>
              <span className="header__notification"></span>
            </div>
          </div>
        </div>



      </div>
    </header>
  );
};
