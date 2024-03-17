import Breadcrumps from '../Breadcrumps/Breadcrumps';
import prod from '../../images/gnider-tam-ge_ftrk7wDc-unsplash 3.jpg';
import './Cart.css';

export default function Cart() {
  return(
    <section className="cart">
      <h2 className="cart__title">Корзина</h2>
      <Breadcrumps />
      <div className="cart__container">
        <div className="cart__additives">
          <div className="cart__search">
            <input type="text" className="cart__search-input" placeholder="Поиск..." />
            <button type="button" className="cart__search-btn" />
          </div>
            <p className="cart__label">Всего товаров: <span className="cart__number">6</span></p>
          <button className="cart__clear-btn" type="button">очистить</button>
        </div>
        <div className="cart__products">
          <ul className="cart__products-list">
            <li className="cart__product">
              <div className="cart__image-container">
                <img className="cart__product-img" src={prod} alt="" />
                <button className="cart__like-btn" type="button" />
              </div>
              <div className="cart__product-info">
                <span className="cart__product-name">Корпус 88-1242 2452 54452 13546 225235 624624523</span>
                <button className="cart__remove-btn" type="button" />
                <div className="cart__product-cost-info">
                  <div className="cart__one-product-cost">
                    <span className="cart__one-cost-value">2790 &#8381;</span>
                    <span className="'cart__one-cost-label">цена за 1 шт</span>
                  </div>
                  <div className="cart__quantity">
                    <button className="cart__decrease-btn" type="button" />
                    <input className="cart__quantity-input" type="number" />
                    <button className="cart__increase-btn" type="button" />
                  </div>
                  <span className="cart__all-cost">2790 &#8381;</span>
                </div>
              </div>
            </li>
          </ul>
          <div className="cart__form">
            <button className="cart__form-btn">оформить заказ</button>
            <div className="cart__form-info">
              <span className="cart__form-all">Итого:</span>
              <div className="cart__sale-info">
                <span className="cart__sale-label">Скидка</span>
                <span className="cart__sale-value">0 &#8381;</span>
              </div>
              <div className="cart__cost-info">
                <span className="cart__cost-label">6 товаров</span>
                <span className="cart__cost-value">3290 &#8381;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
