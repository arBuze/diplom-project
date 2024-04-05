import { useEffect } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './OrderCreate.css';
import { useNavigate } from 'react-router-dom';

export default function OrderCreate({ cards }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length === 0) {
      navigate('/cart');
    }
  },[])

  return(
    <section className="order-create">
      <h2 className="order-create__title">Оформление заказа</h2>
      <Breadcrumps />
      <div className="order-create__container">
        <div className="order-create__info-container">
          <div className="order-create__user-info">
            <h3 className="order-create__user-title"></h3>
            <label className="order-create__email">
              E-mail
              <input type="email" className="order-create__email-input"></input>
            </label>
            <label className="order-create__email">
              Телефон
              <input type="tel" className="order-create__email-input"></input>
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
              <tr className="order-view__row">
                <td className="order-view__data">
                  <Link to='/' className="order-view__link order-view__link_type_image">
                    <img className="order-view__image" src={image} alt='' />
                  </Link>
                  <Link to='/' className="order-view__link order-view__link_type_name">
                    <span className="order-view__name">Корпус 12-1242 2452 54452 13546</span>
                  </Link>
                </td>
                <td className="order-view__data">1 шт</td>
                <td className="order-view__data">500 &#8381;</td>
              </tr>
              <tr className="order-view__row">
                <td className="order-view__data">
                  <Link to='/' className="order-view__link order-view__link_type_image">
                    <img className="order-view__image" src={image} alt='' />
                  </Link>
                  <Link to='/' className="order-view__link order-view__link_type_name">
                    <span className="order-view__name">Корпус 12-1242 2452 54452 13546</span>
                  </Link>
                </td>
                <td className="order-view__data">1 шт</td>
                <td className="order-view__data">500 &#8381;</td>
              </tr>
              <tr className="order-view__row">
                <td className="order-view__data">
                  <Link to='/' className="order-view__link order-view__link_type_image">
                    <img className="order-view__image" src={image} alt='' />
                  </Link>
                  <Link to='/' className="order-view__link order-view__link_type_name">
                    <span className="order-view__name">Корпус 12-1242 2452 54452 13546</span>
                  </Link>
                </td>
                <td className="order-view__data">1 шт</td>
                <td className="order-view__data">500 &#8381;</td>
              </tr>
              <tr className="order-view__row">
                <td className="order-view__data">&nbsp;</td>
                <td className="order-view__data">Итого:</td>
                <td className="order-view__data">500 &#8381;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart__form">
          <button className="cart__form-btn">оформить заказ</button>
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
