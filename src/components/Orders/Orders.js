import './Orders.css';
import { Link } from 'react-router-dom';
import comp from '../../images/giorgio-trovato-v_bri4iVuiM-unsplash.jpg';

export default function Orders() {
  return(
    <div className="orders">
      <ul className="orders__list">
        <li className="orders__item">
          <p className="orders__title">Заказ №1283 от 12.03.2024</p>
          <div className="orders__container">
            <div className="orders__info">
              <span className="orders__quantity">6 товаров на сумму <span className="orders__cost">15000 &#8381;</span></span>
              <span className="orders__status">Статус: в сборке</span>
              <Link to='/profile/orders/1' className="orders__details">подробнее</Link>
            </div>
            <ul className="orders__product-list">
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product orders__product_other">
                <span className="orders__other-products">+ еще 2&nbsp;товара</span>
              </li>
            </ul>
          </div>
        </li>
        <li className="orders__item">
          <p className="orders__title">Заказ №1283 от 12.03.2024</p>
          <div className="orders__container">
            <div className="orders__info">
              <span className="orders__quantity">6 товаров на сумму <span className="orders__cost">15000 &#8381;</span></span>
              <span className="orders__status">Статус: в сборке</span>
              <Link to='/profile/orders/1' className="orders__details">подробнее</Link>
            </div>
            <ul className="orders__product-list">
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product orders__product_other">
                <span className="orders__other-products">+ еще 2&nbsp;товара</span>
              </li>
            </ul>
          </div>
        </li>
        <li className="orders__item">
          <p className="orders__title">Заказ №1283 от 12.03.2024</p>
          <div className="orders__container">
            <div className="orders__info">
              <span className="orders__quantity">6 товаров на сумму <span className="orders__cost">15000 &#8381;</span></span>
              <span className="orders__status">Статус: в сборке</span>
              <Link to='/profile/orders/1' className="orders__details">подробнее</Link>
            </div>
            <ul className="orders__product-list">
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product orders__product_other">
                <span className="orders__other-products">+ еще 2&nbsp;товара</span>
              </li>
            </ul>
          </div>
        </li>
        <li className="orders__item">
          <p className="orders__title">Заказ №1283 от 12.03.2024</p>
          <div className="orders__container">
            <div className="orders__info">
              <span className="orders__quantity">6 товаров на сумму <span className="orders__cost">15000 &#8381;</span></span>
              <span className="orders__status">Статус: в сборке</span>
              <Link to='/profile/orders/1' className="orders__details">подробнее</Link>
            </div>
            <ul className="orders__product-list">
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product">
                <Link to='/' className="orders__link">
                  <img className="orders__image" src={comp} alt='Товар' />
                </Link>
              </li>
              <li className="orders__product orders__product_other">
                <span className="orders__other-products">+ еще 2&nbsp;товара</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

