import SearchForm from "../SearchForm/SearchForm";
import Section from "../Section";
import oneComp from '../../images/one-computer.jpg';
import { cards } from "../../utils/constants";
import { Link } from "react-router-dom";

export default function Main() {
  return(
    <>
      <section className="intro">
        <div className="intro__container">
          <h1 className="intro__title">собери свою мечту</h1>
          <h2 className="intro__subtitle">ремонт и сборка компьютеров</h2>
          <SearchForm />
        </div>
      </section>
      <Section title='Новинки' cards={cards} /> {/* передавать название секции и карточки */}
      <Section title='Акции' cards={cards} />

      <section className="catalog-preview">
        <h2 className="catalog-preview__title">Кaталог</h2>
        <ul className="catalog-preview__list">
          <ol className="catalog-preview__row">
          <li className="catalog-preview__item">
            <Link to="/catalog/computer-cases" className="catalog-preview__link">
              <img className="catalog-preview__image" src={oneComp} alt="" />
              <h3 to="/catalog/computer-cases" className="catalog-preview__item-name">
                Корпуса
              </h3>
            </Link>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Процессоры
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Материнские платы
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Видеокарты
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Кулеры
            </h3>
          </li>
          </ol>

          <ol className="catalog-preview__row">
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Оперативная память
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Блок питания
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Хранение данных
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Звуковые карты
            </h3>
          </li>
          <li className="catalog-preview__item">
            <img className="catalog-preview__image" src={oneComp} />
            <h3 className="catalog-preview__item-name" href="#">
              Мониторы
            </h3>
          </li>
          </ol>


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
    </>
  );
};
