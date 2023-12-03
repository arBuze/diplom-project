import logo from '../images/logo.svg'
import oneComp from '../images/one-computer.jpg';
import '../index.css';
import Section from './Section';

function App() {
  return (
    <div className="page">
      <header className="header">
      <div className="header__container">
        <div className="header__links">
          <a className="header__logo-link" href="#">
            <img className="header__logo" src={logo} alt="Логотип" />
          </a>
          <button className="header__phone-button" type="button"></button>
        </div>
        <nav className="header__menu">
          <ul className="header__menu-links">
            <li className="header__menu-link">
              <a className="header__menu-item" href="#">Кaталог</a>
            </li>
            <li className="header__menu-link">
              <a className="header__menu-item" href="#">Ремонт</a>
            </li>
            <li className="header__menu-link">
              <a className="header__menu-item" href="#">Сборка</a>
            </li>
            <li className="header__menu-link">
              <a className="header__menu-item" href="#">О нас</a>
            </li>
          </ul>
        </nav>
        <div className="header__profile-buttons">
          <button className="header__search" type="button"></button>
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
      <main className="main">
        <section className="intro">
          <div className="intro__container">
          <h1 className="intro__title">собери свою мечту</h1>
          <h2 className="intro__subtitle">сборка и ремонт компьютеров</h2>
          <form className="intro__search">
            <input className="intro__search-line" type="text" name="search" placeholder="Поиск..." />
            <button className="intro__search-button" type="submit"></button>
          </form>
        </div>
        </section>
        <Section />
        {/* <section className="stocks">
        <h2 className="stocks__title">Акции</h2>
          <div className="stocks__show">
            <ul className="stocks__list">
            <li className="stocks__product-card">
              <div className="stocks__img-container">
                <img className="stocks__product-img" src="" alt="" />
                <button className="stocks__like" type="button"></button>
                <div className="stocks__rating"></div>
              </div>
              <div className="stocks__info">
                <h3 className="stocks__name"></h3>
                <span className="stocks__cost"></span>
                <button className="stocks__add" type="button"></button>
              </div>
            </li>
            <li className="stocks__product-card">
              <div className="stocks__img-container">
                <img className="stocks__product-img" src="" alt="" />
                <button className="stocks__like" type="button"></button>
                <div className="stocks__rating"></div>
              </div>
              <div className="stocks__info">
                <h3 className="stocks__name"></h3>
                <span className="stocks__cost"></span>
                <button className="stocks__add" type="button"></button>
              </div>
            </li>
            <li className="stocks__product-card">
              <div className="stocks__img-container">
                <img className="stocks__product-img" src="" alt="" />
                <button className="stocks__like" type="button"></button>
                <div className="stocks__rating"></div>
              </div>
              <div className="stocks__info">
                <h3 className="stocks__name"></h3>
                <span className="stocks__cost"></span>
                <button className="stocks__add" type="button"></button>
              </div>
            </li>
            <li className="stocks__product-card">
              <div className="stocks__img-container">
                <img className="stocks__product-img" src="" alt="" />
                <button className="stocks__like" type="button"></button>
                <div className="stocks__rating"></div>
              </div>
              <div className="stocks__info">
                <h3 className="stocks__name"></h3>
                <span className="stocks__cost"></span>
                <button className="stocks__add" type="button"></button>
              </div>
            </li>
            </ul>
            <div className="stocks__points"></div>
            <img className="stocks__arrow arrow arrow_type_left" src="" alt="" />
            <img className="stocks__arrow arrow arrow_type_right" src="" alt="" />
          </div>
        </section> */}
        <section className="catalog">
        <h2 className="catalog__title">Кaталог</h2>
        <ul className="catalog__list">
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              {/* <h3 className="catalog__item-name"></h3> */}
              Корпус
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Процессор
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Материнская плата
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Видеокарта
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Кулер
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Оперативная память
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Блок питания
            </a>
          </li>
          <li className="catalog__item">
            <img className="catalog__image" src={oneComp} />
            <a className="catalog__link" href="#">
              Хранение данных
            </a>
            </li>
            <li className="catalog__item">
              <img className="catalog__image" src={oneComp} />
              <a className="catalog__link" href="#">
              Звуковая карта
              </a>
            </li>
          </ul>
        </section>
        <section className="build">
          <h2 className="build__title"></h2>
          <a className="build__link" href="#"></a>
        </section>
        <section className="repair">
          <h2 className="repair__title"></h2>
          <p className="repair__info"></p>
        </section>
      </main>
      <footer className="footer">

      </footer>
    </div>
  );
}

export default App;
