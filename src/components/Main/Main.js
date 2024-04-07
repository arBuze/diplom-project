import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import Section from "../Section/Section";
import oneComp from '../../images/one-computer.jpg';
import { Link, useNavigate } from "react-router-dom";

export default function Main({ cards, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove }) {
  const navigate = useNavigate();

  function handleFormBtnClick() {
    navigate('/repair');
  }

  return(
    <>
      <section className="intro">
        <div className="intro__container">
          <h1 className="intro__title">собери свою мечту</h1>
          <h2 className="intro__subtitle">ремонт и сборка компьютеров</h2>
          <SearchForm />
        </div>
      </section>
      <Section title='Новинки' cards={cards} pathname={pathname}
        faves={faves} cart={cart}
        onLike={onLike} onDislike={onDislike}
        onCartAdd={onCartAdd} onCartRemove={onCartRemove} />
      <Section title='Акции' cards={cards} pathname={pathname}
        faves={faves} cart={cart}
        onLike={onLike} onDislike={onDislike}
        onCartAdd={onCartAdd} onCartRemove={onCartRemove} />

      <section className="catalog-preview">
        <h2 className="catalog-preview__title">Кaталог</h2>
        <ul className="catalog-preview__list">
          <ol className="catalog-preview__row">
          <li className="catalog-preview__item">
            <Link to="/catalog/computer-cases" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Корпуса
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/processors" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Процессоры
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/motherboards" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Материнские платы
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/video-cards" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Видеокарты
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/coolers" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Кулеры
              </h3>
            </Link>
          </li>
          </ol>

          <ol className="catalog-preview__row">
          <li className="catalog-preview__item">
            <Link to="/catalog/rams" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Оперативная память
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/power-units" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Блок питания
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/storages" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Хранение данных
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/sound-boards" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Звуковые карты
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <Link to="/catalog/peripheral" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 className="catalog-preview__item-name">
                Периферия
              </h3>
            </Link>
          </li>
          </ol>
        </ul>
      </section>
      {/* <section className="build">
        <h2 className="build__title"></h2>
        <a className="build__link" href="#"></a>
      </section> */}
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
