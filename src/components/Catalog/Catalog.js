import './Catalog.css';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import oneComp from '../../images/one-computer.jpg';
import { cards } from '../../utils/constants';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Catalog() {


  return(
    <>
      <section className="catalog">
        <h2 className="catalog__title">Каталог</h2>
        <Breadcrumps />
        <ul className="catalog__list">
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Корпуса</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Процессоры</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Материнские платы</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Видеокарты</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Кулеры</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Оперативная память</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Блок питания</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Хранение данных</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Звуковые карты</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={oneComp} />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Мониторы</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
        </ul>
      </section>
    </>
  );
};