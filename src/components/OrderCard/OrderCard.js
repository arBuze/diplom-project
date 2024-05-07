import './OrderCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard({ order, onStatusChange }) {
  const [isMore, setIsMore] = useState(false);
  const {
    products,
    createdAt,
    status,
    contacts,
  } = order;

  function handleMoreClick() {
    setIsMore(!isMore);
  }

  return(
    <li className="all-order__item">
      <p className="all-order__title">Заказ №1283 от {createdAt}, статус: {status}
        <button className="all-order__change-btn" type="button" onClick={onStatusChange} />
      </p>
      <p className="all-order__contacts"> Контакты
        { contacts.phone &&
          <span className="all-order__contact">Телефон: {contacts.phone}</span>
        }
        { contacts.email &&
          <span className="all-order__contact">Email: {contacts.email}</span>
        }
      </p>
      <button type="button" className="all-order__more-btn" onClick={handleMoreClick}>{isMore ? 'Скрыть' : 'Подробнее'}</button>
      {
        isMore &&
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
              products.map((item) =>
                <tr key={item.id} className="order-view__row">
                  <td className="order-view__data">
                    <Link to={'/catalog/' + item.category + '/' + item.id} className="order-view__link order-view__link_type_image">
                      <img className="order-view__image" src={item.image} alt='' />
                    </Link>
                    <Link to={'/catalog/' + item.category + '/' + item.id} className="order-view__link order-view__link_type_name">
                      <span className="order-view__name">{item.productName}</span>
                    </Link>
                  </td>
                  <td className="order-view__data">{item.quantity} шт</td>
                  <td className="order-view__data">{item.productCost} &#8381;</td> {/* сделать с уже учетом скидки */}
                </tr>
              )
            }
            <tr className="order-view__row">
              <td className="order-view__data">&nbsp;</td>
              <td className="order-view__data">Итого:</td>
              <td className="order-view__data">{products?.reduce((sum, item) => sum + item.productCost*item.quantity, 0)} &#8381;</td>
            </tr>
          </tbody>
        </table>
      }
    </li>
  );
}
