import './OrderCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_PROD_URL } from '../../utils/constants';

export default function OrderCard({ order, onStatusChange }) {
  const [isMore, setIsMore] = useState(false);
  const {
    products,
    createdAt,
    status,
    contacts,
    payment,
    _id,
  } = order;
  const time = [createdAt?.slice(8,10), createdAt?.slice(5,7), createdAt?.slice(0,4)].join('.');

  function handleMoreClick() {
    setIsMore(!isMore);
  }

  function handleStatusChange() {
    onStatusChange(order);
  }

  return(
    <li className={`all-order__item ${isMore ? 'all-order__item_more' : ''}`}>
      <p className="all-order__title">Заказ <span className="all-order__bold">№{_id?.slice(0,5)?.toUpperCase() + createdAt?.slice(createdAt?.indexOf('.') + 1, createdAt?.indexOf('.') + 4)}</span> от {time}, статус: <span className="all-order__bold">{status}</span>
        { (status !== 'выполнен' || status !== 'отменен') && <button className="all-order__change-btn" type="button" onClick={handleStatusChange} /> }
      </p>
      <p className="all-orders__contact-title">Способ оплаты: <span className="all-order__contact">{payment}</span></p>
      <p className="all-orders__contact-title">Контакты</p>
      <div className="all-order__contacts">
        { contacts.phone &&
          <span className="all-order__contact">Телефон: 7 929 000-00-00</span>
        }
        { contacts.email &&
          <span className="all-order__contact">Email: {contacts.email}</span>
        }
      </div>
      <button type="button" className={`all-order__more-btn ${isMore ? 'all-order__more-btn_more' : ''}`} onClick={handleMoreClick}>{isMore ? 'Скрыть' : 'Подробнее'}</button>
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
                <tr key={item.productId} className="order-view__row">
                  <td className="order-view__data">
                    <Link to={'/catalog/' + item.category + '/' + item.productId} className="order-view__link order-view__link_type_image">
                      <img className="order-view__image" crossOrigin='true' src={BASE_PROD_URL + item.image} alt='' />
                    </Link>
                    <Link to={'/catalog/' + item.category + '/' + item.productId} className="order-view__link order-view__link_type_name">
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
