import './OrderView.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BASE_PROD_URL } from '../../utils/constants';

export default function OrderView({ cards, pathname }) {
  const [currentOrder, setCurrentOrder] = useState({});
  const [time, setTime] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
    const order = cards.find((item) => item._id === id);
    console.log(cards, order, id);
    setCurrentOrder(order);
    setTime([order.createdAt.slice(8,10), order.createdAt.slice(5,7), order.createdAt.slice(0,4)].join('.'));
    setOrderNumber(order._id.slice(0,5).toUpperCase() + order.createdAt.slice(order.createdAt.indexOf('.') + 1, order.createdAt.indexOf('.') + 4));
  }, [cards, pathname])

  return(
    <div className="order-view">
      <h3 className="order-view__title">Заказ №{orderNumber}, создан {time}</h3>
      <button className="order-view__cancel-btn">отменить</button>
      <p className="order-view__cost">Сумма заказа: <span className="order-view__highlight">
        {currentOrder?.products?.reduce((sum, item) => sum + item.productCost, 0)} &#8381;
      </span></p>
      <p className="order-view__cost">Статус заказа: <span className="order-view__highlight">оплачен</span></p> {/* currentOrder?.status */}
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
            currentOrder?.products?.map((item) =>
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
            <td className="order-view__data">{currentOrder?.products?.reduce((sum, item) => sum + item.productCost*item.quantity, 0)} &#8381;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

