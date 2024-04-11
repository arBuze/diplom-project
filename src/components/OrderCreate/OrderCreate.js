import { useContext, useEffect } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './OrderCreate.css';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../images/computer.jpg';
import { CurrentUserContext } from '../../contexts/CurrentUserContexts';

export default function OrderCreate({ cards, onOrderCreate }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length === 0) {
      navigate('/cart');
    }
  },[cards.length])

  return(
    <section className="order-create">
      <h2 className="order-create__title">Оформление заказа</h2>
      <Breadcrumps />
      <div className="order-create__container">
        <div className="order-create__info-container">
          <div className="order-create__user-info">
            <h3 className="order-create__user-title">Данные пользователя</h3>
            <div className="order-create__contacts">
              <label className="order-create__label">
                E-mail<span className="order-create__required">*</span>
                <input type="email" className="order-create__data-input" name='email'></input>
              </label>
              <span className="order-create__or">или</span>
              <label className="order-create__label">
                Телефон<span className="order-create__required">*</span>
                <input type="tel" className="order-create__data-input" name='phone'
                  placeholder='89772371223' maxLength='11'></input>
              </label>
            </div>
            <label className="order-create__label">
              Имя<span className="order-create__required">*</span>
              <input type="text" className="order-create__data-input" name='name'></input>
            </label>
            <label className="order-create__label">
              Фамилия<span className="order-create__required">*</span>
              <input type="text" className="order-create__data-input" name='lastName'></input>
            </label>
          </div>
          <span className="order-view__list-title">Содержимое заказа</span>
          <table className="order-view__table">
            <thead className="order-view__head">
            <tr className="order-view__row">
              <td className="order-view__data">Название</td>
              <td className="order-view__data">Количество</td>
              <td className="order-view__data">Цена за шт.</td>
            </tr>
            </thead>
            <tbody className="order-view__body">
              {
                cards.map((item) =>
                  <tr className="order-view__row">
                    <td className="order-view__data">
                      <Link to='/' className="order-view__link order-view__link_type_image">
                        <img className="order-view__image" src={item.image} alt='' />
                      </Link>
                      <Link to='/' className="order-view__link order-view__link_type_name">
                        <span className="order-view__name">{item.productName}</span>
                      </Link>
                    </td>
                    <td className="order-view__data">{item.quantity} шт</td>
                    <td className="order-view__data">{item.productCost} &#8381;</td>
                  </tr>
                )
              }
              <tr className="order-view__row">
                <td className="order-view__data">&nbsp;</td>
                <td className="order-view__data">Итого:</td>
                <td className="order-view__data">{cards.reduce((sum, item) => sum + item.productCost * item.quantity, 0)} &#8381;</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              <span className="cart__cost-value">{cards.reduce((sum, item) => sum + item.productCost * item.quantity, 0)} &#8381;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
