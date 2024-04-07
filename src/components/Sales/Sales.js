import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Sales.css';
import comp from '../../images/giorgio-trovato.jpg';
import { Link } from 'react-router-dom';

export default function Sales() {
  return(
    <section className="sales">
      <h2 className="sales__title">Акции</h2>
      <Breadcrumps />
      <div className="sales__container">
        <div className="sales__additives">
          <label className="sales__label">
            <input className='sales__radio' type='radio' name='time' id="all" />
            <span className="sales__pseudo-radio">Все</span>
          </label>
          <label className="sales__label">
            <input className='sales__radio' type='radio' name='time' id="new" />
            <span className="sales__pseudo-radio">Новые</span>
          </label>
          <label className="sales__label">
            <input className='sales__radio' type='radio' name='time' id="now" />
            <span className="sales__pseudo-radio">Текущие</span>
          </label>
          <label className="sales__label">
            <input className='sales__radio' type='radio' name='time' id="over" />
            <span className="sales__pseudo-radio">Скоро закончатся</span>
          </label>
        </div>
        <ul className="sales__list">
          <li className="sales__item">
            <img className="sales__image" src={comp} alt='' />
            <div className="sales__info">
              <Link to='/sales/1' className="sales__name">Скидки на корпуса 1233452</Link>
              <span className="sales__duration">с 12 марта по 12 апреля 2024</span>
              <Link to='/sales/1' className="sales__link">Связанные товары &rarr;</Link>
            </div>
          </li>
          <li className="sales__item">
            <img className="sales__image" src={comp} alt='' />
            <div className="sales__info">
              <p className="sales__name">Скидки на корпуса 1233452</p>
              <span className="sales__duration">с 12 марта по 12 апреля 2024</span>
              <Link to='/sales/1' className="sales__link">Связанные товары &rarr;</Link>
            </div>
          </li>
          <li className="sales__item">
            <img className="sales__image" src={comp} alt='' />
            <div className="sales__info">
              <p className="sales__name">Скидки на корпуса 1233452</p>
              <span className="sales__duration">с 12 марта по 12 апреля 2024</span>
              <Link to='/sales/1' className="sales__link">Связанные товары &rarr;</Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

