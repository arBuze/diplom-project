import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './Sales.css';
import comp from '../../images/giorgio-trovato.jpg';
import vcard from '../../images/daniel-hatcher-zPHftoPajis-unsplash.jpg';
import { Link } from 'react-router-dom';
import { BASE_SALE_URL } from '../../utils/constants';

export default function Sales({ sales, pathname }) {
  return(
    <section className="sales">
      <h2 className="sales__title">Акции</h2>
      {!pathname.includes('admin') && <Breadcrumps />}
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
          { pathname.includes('admin') && <button type="button" className="sales__add-btn">Добавить новую акцию</button> }
        </div>
        <ul className="sales__list">
          {/* {
            sales?.map((item) =>
              <li key={item._id} className="sales__item">
                <img className="sales__image" crossOrigin='true' src={BASE_SALE_URL + item.image} alt='' />
                <div className="sales__info">
                  <Link to='/sales/1' className="sales__name">{item.name}</Link>
                  <span className="sales__duration">с 12 мая по 2 июня 2024</span>
                  { pathname.includes('admin') ?
                    <Link to={`/admin/sales/${item._id}`} className="sales__link">Изменить</Link>
                    : <Link to={`/sales/${item._id}`} className="sales__link">Связанные товары &rarr;</Link>
                  }
                </div>
              </li>
            )
          } */}
          <li className="sales__item">
            <img className="sales__image" src={vcard} alt='' />
            <div className="sales__info">
              <Link to='/sales/1' className="sales__name">Скидки на видеокарты MSI</Link>
              <span className="sales__duration">с 12 мая по 2 июня 2024</span>
              { pathname.includes('admin') ?
                <Link to='/admin/sales/1' className="sales__link">Изменить</Link>
                : <Link to='/sales/1' className="sales__link">Связанные товары &rarr;</Link>
              }
            </div>
          </li>
          <li className="sales__item">
            <img className="sales__image" src={comp} alt='' />
            <div className="sales__info">
              <p className="sales__name">Скидки на корпуса DEEPCOOL</p>
              <span className="sales__duration">с 5 марта по 19 марта 2024</span>
              { pathname.includes('admin') ?
                <Link to='/admin/sales/1' className="sales__link">Изменить</Link>
                : <Link to='/sales/1' className="sales__link">Связанные товары &rarr;</Link>
              }
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

