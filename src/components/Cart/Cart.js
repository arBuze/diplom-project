import Breadcrumps from '../Breadcrumps/Breadcrumps';
import prod from '../../images/gnider-tam-ge_ftrk7wDc-unsplash 3.jpg';
import './Cart.css';
import { Link } from 'react-router-dom';

export default function Cart({ cards, onLike, onDislike, onCartRemove, faves, cart, onCartClear, onQuantityChange, onOrderCreate }) {

  function handleLikeClick(e) {
    let isLiked = e.target.classList.contains('liked');

    if (isLiked) {
      onDislike(Number(e.target.id));
      return;
    }
    onLike(Number(e.target.id));
  }

  function handleCartRemove(e) {
    onCartRemove(Number(e.target.id));
  }

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
            <p className="cart__label">Всего товаров: <span className="cart__number">{cards.length}</span></p>
          <button className="cart__clear-btn" type="button" onClick={onCartClear}>очистить</button>
        </div>
        <div className="cart__products">
          { cards.length === 0 ?
            <div className="cart__void">
              <p className="cart__void-text">Корзина пуста</p>
            </div>
            : <ul className="cart__products-list">
            {
              cards.map((card) => {
                /* let quan = cart.find((item) => item.cardId === card.id).quantity; */
                return(
                <li key={card.id} className="cart__product">
                  <Link to={'/catalog/' + card.category + '/' + card.id} className="cart__image-container">
                    <img className="cart__product-img" src={card.image} alt="" />
                  </Link>
                  <button className={`cart__like-btn ${faves.find((item) => item === card.id) ? 'liked' : ''}`} type="button"
                    onClick={handleLikeClick} id={card.id} />
                  <div className="cart__product-info">
                    <Link to={'/catalog/' + card.category + '/' + card.id} className="cart__product-name">{card.productName}</Link>
                    <button className="cart__remove-btn" type="button" id={card.id}
                      onClick={handleCartRemove} />
                    <div className="cart__product-cost-info">
                      <div className="cart__one-product-cost">
                        <span className="cart__one-cost-value">{card.productCost} &#8381;</span>
                        <span className="cart__one-cost-label">цена за 1 шт</span>
                      </div>
                      <div className="cart__quantity">
                        <button className="cart__decrease-btn" type="button" name='decrease' id={card.id} onClick={onQuantityChange}>-</button>
                        <input className="cart__quantity-input" value={card.quantity}  type="text" readOnly />
                        <button className="cart__increase-btn" type="button" name='increase' id={card.id} onClick={onQuantityChange}>+</button>
                      </div>
                      <span className="cart__all-cost">{card.quantity * card.productCost} &#8381;</span>
                    </div>
                  </div>
                </li>
              )
            })
            }
          </ul>
          }
          <div className="cart__form">
            <button className="cart__form-btn" onClick={onOrderCreate}>оформить заказ</button>
            <div className="cart__form-info">
              <span className="cart__form-all">Итого:</span>
              <div className="cart__sale-info">
                <span className="cart__sale-label">Скидка</span>
                <span className="cart__sale-value">0 &#8381;</span>
              </div>
              <div className="cart__cost-info">
                <span className="cart__cost-label">{`${cards.length} товар${[11, 12, 13, 14].indexOf(cards.length % 100) !== -1 ? 'ов' : cards.length % 10 === 1 ? '' : [2, 3, 4].indexOf(cards.length % 10) !== -1 ? 'а' : 'ов'}`}</span>
                <span className="cart__cost-value">{cart.reduce((sum, item) => sum + item.productCost * item.quantity, 0)} &#8381;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
