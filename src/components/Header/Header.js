import { useState } from 'react';
import logo from '../../images/LOGO1.svg'
import SearchForm from '../SearchForm/SearchForm';
import { Link } from 'react-router-dom';

export default function Header() {
  return(
    <header className="header">
      <div className="header__container">
        <div className="header__links">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          <button className="header__phone-button" type="button"></button>
          <p className="header__phone-number">+ 7 (999) 545-23-43</p>
        </div>
        <nav className="header__menu">
          <ul className="header__menu-links">
            <li className="header__menu-link">
              <Link to="/catalog" className="header__menu-item">Кaталог</Link>
            </li>
            <li className="header__menu-link">
              <Link to="/repair" className="header__menu-item">Ремонт</Link>
            </li>
            <li className="header__menu-link">
              <Link to="/build" className="header__menu-item">Сборка</Link>
            </li>
            <li className="header__menu-link">
              <Link to="/sale" className="header__menu-item">Акции</Link>
            </li>
            <li className="header__menu-link">
              <Link to="/about-us" className="header__menu-item">О нас</Link>
            </li>
          </ul>
        </nav>
        <div className="header__profile-buttons">
          <SearchForm classForHeader="search-form_type_header" />
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
    </header>
  );
};
