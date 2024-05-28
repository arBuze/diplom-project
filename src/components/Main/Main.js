import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import Section from "../Section/Section";
import compcase from '../../images/olivier-collet-VDGBFiaM6Cs-unsplash.jpg';
import proc from '../../images/olivier-collet-JMwCe3w7qKk-unsplash.jpg';
import mboard from '../../images/infralist-com-Sc1GJCninik-unsplash.jpg';
import vcard from '../../images/daniel-hatcher-zPHftoPajis-unsplash.jpg';
import cooler from '../../images/aviv-rachmadian-5fZqHF21CIw-unsplash.jpg';
import ram from '../../images/liam-briese-lYxQ5F9xBDM-unsplash.jpg';
import supply from '../../images/r4cu2iny6vqgsp49pfoawg.jpg';
import stor from '../../images/marc-pezin-uJMfXAdDMyE-unsplash.jpg';
import sound from '../../images/vitaly-sacred-SLbN0BLiadY-unsplash.jpg';
import per from '../../images/amjith-s-NOY_FzRublM-unsplash.jpg';
import { Link, useNavigate } from "react-router-dom";

export default function Main({ cards, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove, onSearch }) {
  const navigate = useNavigate();

  function handleFormBtnClick() {
    navigate('/repair');
  }

  return(
    <>
      <section className="intro">
        <div className="intro__container">
          <h1 className="intro__title">ваш компьютер - наша забота</h1>
          <h2 className="intro__subtitle">ремонт и сборка компьютеров</h2>
          <SearchForm onSearch={onSearch} pathname={pathname} />
        </div>
      </section>
      <Section title='Новинки' cards={cards.slice(0, 10)} pathname={pathname}
        faves={faves} cart={cart}
        onLike={onLike} onDislike={onDislike}
        onCartAdd={onCartAdd} onCartRemove={onCartRemove} />
      <Section title='Акции' cards={cards.filter((item) => item.category === 'video-cards')} pathname={pathname}
        faves={faves} cart={cart}
        onLike={onLike} onDislike={onDislike}
        onCartAdd={onCartAdd} onCartRemove={onCartRemove} />

      <section className="catalog-preview">
        <h2 className="catalog-preview__title">Кaталог</h2>
        <ul className="catalog-preview__list">
          <ol className="catalog-preview__row">
          <li className="catalog-preview__item">
            <Link to="/catalog/computer-cases" className="catalog-preview__link">
              <img className="catalog-preview__image" src={compcase} alt="" />
              <h3 className="catalog-preview__item-name">
                Корпуса
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/processors" className="catalog-preview__link">
              <img className="catalog-preview__image" src={proc} alt="" />
              <h3 className="catalog-preview__item-name">
                Процессоры
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/motherboards" className="catalog-preview__link">
              <img className="catalog-preview__image" src={mboard} alt="" />
              <h3 className="catalog-preview__item-name">
                Материнские платы
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/video-cards" className="catalog-preview__link">
              <img className="catalog-preview__image" src={vcard} alt="" />
              <h3 className="catalog-preview__item-name">
                Видеокарты
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/coolers" className="catalog-preview__link">
              <img className="catalog-preview__image" src={cooler} alt="" />
              <h3 className="catalog-preview__item-name">
                Кулеры
              </h3>
            </Link>
          </li>
          </ol>

          <ol className="catalog-preview__row">
          <li className="catalog-preview__item">
            <Link to="/catalog/rams" className="catalog-preview__link">
              <img className="catalog-preview__image" src={ram} alt="" />
              <h3 className="catalog-preview__item-name">
                Оперативная память
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/power-units" className="catalog-preview__link">
              <img className="catalog-preview__image" src={supply} alt="" />
              <h3 className="catalog-preview__item-name">
                Блок питания
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/storages" className="catalog-preview__link">
              <img className="catalog-preview__image" src={stor} alt="" />
              <h3 className="catalog-preview__item-name">
                Хранение данных
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/sound-boards" className="catalog-preview__link">
              <img className="catalog-preview__image" src={sound} alt="" />
              <h3 className="catalog-preview__item-name">
                Звуковые карты
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/peripheral" className="catalog-preview__link">
              <img className="catalog-preview__image" src={per} alt="" />
              <h3 className="catalog-preview__item-name">
                Периферия
              </h3>
            </Link>
          </li>
          </ol>
        </ul>
      </section>
      <section className="build-view">
        <div className="build-view__decor build-view__decor_big"></div>
        <div className="build-view__decor build-view__decor_small"></div>
        <div className="build-view__comp"></div>
        <h2 className="build-view__title">Собрать свой компьютер</h2>
        <Link to="/build" className="build-view__link">
          <span className="build-view__text">вперед</span><span className="build-view__arrow"> &#10230;</span>
        </Link>
      </section>
      <section className="repair-view">
        <h2 className="repair-view__title">Ремонт</h2>
        <ul className="repair-view__action-list">
          <li className="repair-view__item">
            <span className="repair-view__action-name">Заполнить форму</span>
            <button className="repair-view__action-btn repair-view__action-btn_type_form" type="button"
              onClick={handleFormBtnClick} />
          </li>
          <li className="repair-view__item">
            <span className="repair-view__action-name">Связаться с нами</span>
            <button className="repair-view__action-btn repair-view__action-btn_type_tel" type="button" />
          </li>
        </ul>
      </section>
    </>
  );
};
