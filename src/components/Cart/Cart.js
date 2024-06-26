import './Cart.css';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_PROD_URL, wordEnd } from '../../utils/constants';

export default function Cart({ cards, onLike, onDislike, onCartRemove, faves, onCartClear, onQuantityChange }) {
  const navigate = useNavigate();

  function handleLikeClick(e) {
    let isLiked = e.target.classList.contains('liked');

    if (isLiked) {
      onDislike(e.target.id);
      return;
    }
    onLike(e.target.id);
  }

  function handleCartRemove(e) {
    onCartRemove(e.target.id);
  }

  function handleOrderCreate() {
    navigate('/order-create');
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
                <li key={card.productId} className="cart__product">
                  <Link to={'/catalog/' + card.category + '/' + card.productId} className="cart__image-container">
                    <img className="cart__product-img" crossOrigin='true' src={BASE_PROD_URL + card.image} alt="" />
                  </Link>
                  <button className={`cart__like-btn ${faves.find((item) => item === card.productId) ? 'liked' : ''}`} type="button"
                    onClick={handleLikeClick} id={card.productId} />
                  <div className="cart__product-info">
                    <Link to={'/catalog/' + card.category + '/' + card.productId} className="cart__product-name">{card.productName}</Link>
                    <button className="cart__remove-btn" type="button" id={card.productId}
                      onClick={handleCartRemove} />
                    <div className="cart__product-cost-info">
                      <div className="cart__one-product-cost">
                        <span className="cart__one-cost-value">{card.productCost} &#8381;</span>
                        <span className="cart__one-cost-label">цена за 1 шт</span>
                      </div>
                      <div className="cart__quantity">
                        <button className="cart__decrease-btn" type="button" name='decrease' id={card.productId} onClick={onQuantityChange}>-</button>
                        <input className="cart__quantity-input" value={card.quantity}  type="text" readOnly />
                        <button className="cart__increase-btn" type="button" name='increase' id={card.productId} onClick={onQuantityChange}>+</button>
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
            <button className="cart__form-btn" disabled={cards.length === 0} onClick={handleOrderCreate}>оформить заказ</button>
            <div className="cart__form-info">
              <span className="cart__form-all">Итого:</span>
              <div className="cart__sale-info">
                <span className="cart__sale-label">Скидка</span>
                <span className="cart__sale-value">0 &#8381;</span>
              </div>
              <div className="cart__cost-info">
                <span className="cart__cost-label">{`${cards.length} товар${wordEnd(cards.length)}`}</span>
                <span className="cart__cost-value">{cards.reduce((sum, item) => sum + item.productCost * item.quantity, 0)} &#8381;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
