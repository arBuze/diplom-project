import { useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';
import './AllOrders.css';

export default function AllOrders({ orders, onStatusChange }) {
  const [ordersShown, setOrdersShown] = useState([...orders]);

  function handleChange(e) {
    const { value } = e.target;
    if (value === 'все') {
      setOrdersShown(orders);
    } else {
      const filtered = orders.filter((item) => item.status === value);
      setOrdersShown(filtered);
    }
  }

  return(
    <section className="all-orders">
      <div className="all-orders__container">
        <h2 className="all-orders__title">Заказы</h2>
        <div className="all-orders__radio-container">
          <label className="all-orders__label">
            <input type="radio" className="all-orders__status-input" name='status'
              value={'все'} onChange={handleChange} />
            <span className="all-orders__pseudo-radio">Все</span>
          </label>
          <label className="all-orders__label">
            <input type="radio" className="all-orders__status-input" name='status'
              value={'ждет оплаты'} onChange={handleChange} />
            <span className="all-orders__pseudo-radio">Ждет оплаты</span>
          </label>
          <label className="all-orders__label">
            <input type="radio" className="all-orders__status-input" name='status'
              value={'оплачен'} onChange={handleChange} />
            <span className="all-orders__pseudo-radio">Оплачен</span>
          </label>
          <label className="all-orders__label">
            <input type="radio" className="all-orders__status-input" name='status'
              value={'в сборке'} onChange={handleChange} />
            <span className="all-orders__pseudo-radio">В сборке</span>
          </label>
          <label className="all-orders__label">
            <input type="radio" className="all-orders__status-input" name='status'
              value={'готов к выдаче'} onChange={handleChange} />
            <span className="all-orders__pseudo-radio">Готов к выдаче</span>
          </label>
        </div>
        <ul className="all-orders__orders-list">
          {
            ordersShown.map((order) =>
              <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
            )
          }
        </ul>
      </div>
    </section>
  );
}
