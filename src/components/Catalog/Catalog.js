import './Catalog.css';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
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
import { cards } from '../../utils/constants';
import { Link } from 'react-router-dom';

export default function Catalog() {
  return(
      <section className="catalog">
        <h2 className="catalog__title">Каталог</h2>
        <Breadcrumps />
        <ul className="catalog__list">
          <li className="catalog__item">
            <img className="catalog__item-image" src={compcase} alt="" />
            <Link to="/catalog/computer-cases" className="catalog__link">
              <h3 className="catalog__item-title">Корпуса</h3>
            </Link>
            <p className="catalog__quantity">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={proc} alt="" />
            <Link to="/catalog/processors" className="catalog__link">
              <h3 className="catalog__item-title">Процессоры</h3>
            </Link>
            <p className="catalog__quantity">{`${34} товар${[11, 12, 13, 14].indexOf(34 % 100) !== -1 ? 'ов' : 34 % 10 === 1 ? '' : [2, 3, 4].indexOf(34 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={mboard} alt="" />
            <Link to="/catalog/motherboards" className="catalog__link">
              <h3 className="catalog__item-title">Материнские платы</h3>
            </Link>
            <p className="catalog__quantity">{`${22} товар${[11, 12, 13, 14].indexOf(22 % 100) !== -1 ? 'ов' : 22 % 10 === 1 ? '' : [2, 3, 4].indexOf(22 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={vcard} alt="" />
            <Link to="/catalog/video-cards" className="catalog__link">
              <h3 className="catalog__item-title">Видеокарты</h3>
            </Link>
            <p className="catalog__quantity">{`${41} товар${[11, 12, 13, 14].indexOf(41 % 100) !== -1 ? 'ов' : 41 % 10 === 1 ? '' : [2, 3, 4].indexOf(41 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={cooler} alt="" />
            <Link to="/catalog/coolers" className="catalog__link">
              <h3 className="catalog__item-title">Кулеры</h3>
            </Link>
            <p className="catalog__quantity">{`${65} товар${[11, 12, 13, 14].indexOf(65 % 100) !== -1 ? 'ов' : 65 % 10 === 1 ? '' : [2, 3, 4].indexOf(65 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={ram} alt="" />
            <Link to="/catalog/rams" className="catalog__link">
              <h3 className="catalog__item-title">Оперативная память</h3>
            </Link>
            <p className="catalog__quantity">{`${18} товар${[11, 12, 13, 14].indexOf(18 % 100) !== -1 ? 'ов' : 18 % 10 === 1 ? '' : [2, 3, 4].indexOf(18 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={supply} alt="" />
            <Link to="/catalog/power-units" className="catalog__link">
              <h3 className="catalog__item-title">Блок питания</h3>
            </Link>
            <p className="catalog__quantity">{`${29} товар${[11, 12, 13, 14].indexOf(29 % 100) !== -1 ? 'ов' : 29 % 10 === 1 ? '' : [2, 3, 4].indexOf(29 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={stor} alt="" />
            <Link to="/catalog/storages" className="catalog__link">
              <h3 className="catalog__item-title">Хранение данных</h3>
            </Link>
            <p className="catalog__quantity">{`${20} товар${[11, 12, 13, 14].indexOf(20 % 100) !== -1 ? 'ов' : 20 % 10 === 1 ? '' : [2, 3, 4].indexOf(20 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={sound} alt="" />
            <Link to="/catalog/sound-boards" className="catalog__link">
              <h3 className="catalog__item-title">Звуковые карты</h3>
            </Link>
            <p className="catalog__quantity">{`${21} товар${[11, 12, 13, 14].indexOf(21 % 100) !== -1 ? 'ов' : 21 % 10 === 1 ? '' : [2, 3, 4].indexOf(21 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
          <li className="catalog__item">
            <img className="catalog__item-image" src={per} alt="" />
            <Link to="/catalog/peripheral" className="catalog__link">
              <h3 className="catalog__item-title">Периферия</h3>
            </Link>
            <p className="catalog__quantity">{`${47} товар${[11, 12, 13, 14].indexOf(47 % 100) !== -1 ? 'ов' : 47 % 10 === 1 ? '' : [2, 3, 4].indexOf(47 % 10) !== -1 ? 'а' : 'ов'}`}</p>
          </li>
        </ul>
      </section>
  );
};
