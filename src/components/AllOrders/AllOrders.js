import { useEffect, useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';
import './AllOrders.css';

export default function AllOrders({ orders, onStatusChange }) {
  const [ordersShown, setOrdersShown] = useState([...orders]);
  const [statusShown, setStatusShown] = useState('все');
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let filtered = orders;
    if (statusShown !== 'все') {
      filtered = filtered.filter((item) => item.status === statusShown);
    }
    if (searchValue) {
      filtered = filtered.filter((item) => item.id === Number(searchValue)); /* потом будет первые 6 символов id + _ + деньмесяц заказа */
    }
    setOrdersShown(filtered);
  }, [searchValue, statusShown, orders])

  function handleSearchSet(e) {
    e.preventDefault();
    setSearchValue(inputValue);
  }

  function handleInputSet(e) {
    setInputValue(e.target.value);
  }

  function searchClear() {
    setSearchValue('');
    setInputValue('');
  }

  function handleChange(e) {
    const { value } = e.target;
    setStatusShown(value);
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
        <div className="all-orders__inputs-container">
          <div className="all-orders__radio-container">
            <p className="all-orders__status-text">Сортировка по статусу: </p>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'все'} onChange={handleChange} checked={statusShown === 'все'} />
              <span className="all-orders__pseudo-radio">Все</span>
            </label>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'ждет оплаты'} onChange={handleChange} checked={statusShown === 'ждет оплаты'} />
              <span className="all-orders__pseudo-radio">Ждет оплаты</span>
            </label>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'оплачен'} onChange={handleChange} checked={statusShown === 'оплачен'} />
              <span className="all-orders__pseudo-radio">Оплачен</span>
            </label>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'в сборке'} onChange={handleChange} checked={statusShown === 'в сборке'} />
              <span className="all-orders__pseudo-radio">В сборке</span>
            </label>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'готов к выдаче'} onChange={handleChange} checked={statusShown === 'готов к выдаче'} />
              <span className="all-orders__pseudo-radio">Готов к выдаче</span>
            </label>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'выполнен'} onChange={handleChange} checked={statusShown === 'готов к выдаче'} />
              <span className="all-orders__pseudo-radio">Выполнен</span>
            </label>
            <label className="all-orders__label">
              <input type="radio" className="all-orders__status-input" name='status'
                value={'отменен'} onChange={handleChange} checked={statusShown === 'готов к выдаче'} />
              <span className="all-orders__pseudo-radio">Отменен</span>
            </label>
          </div>
          <form className="all-orders__search-container" name='number-search' onSubmit={handleSearchSet}>
              <input type="text" className="all-orders__search" placeholder='Поиск по номеру заказа...'
                value={inputValue} onChange={handleInputSet} />
              <button type="button" className="all-orders__search-cancel"
                disabled={!inputValue} onClick={searchClear} />
              <button type="submit" className="all-orders__search-btn" />
          </form>
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
