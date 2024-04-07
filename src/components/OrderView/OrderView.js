import './OrderView.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function OrderView({ cards, pathname }) {
  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
    const order = cards.find((item) => item.id === id);
    setCurrentOrder(order);
  })

  return(
    <div className="order-view">
      <h3 className="order-view__title">Заказ №{currentOrder?.id}, создан {currentOrder?.createdAt}</h3>
      <p className="order-view__cost">Сумма заказа: <span className="order-view__highlight">
        {currentOrder?.products?.reduce((sum, item) => sum + item.productCost, 0)} &#8381;
      </span></p>
      <p className="order-view__cost">Статус заказа: <span className="order-view__highlight">{currentOrder?.status}</span></p>
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
            <td className="order-view__data">{currentOrder?.products?.reduce((sum, item) => sum + item.productCost, 0)} &#8381;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

