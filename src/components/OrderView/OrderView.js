import './OrderView.css';
import image from '../../images/computer.jpg';
import { Link } from 'react-router-dom';

export default function OrderView() {
  return(
    <div className="order-view">
      <h3 className="order-view__title">Заказ №1283, создан 12.02.2024</h3>
      <p className="order-view__cost">Сумма заказа: <span className="order-view__highlight">3000 &#8381;</span></p>
      <p className="order-view__cost">Статус заказа: <span className="order-view__highlight">выполнен</span></p>
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
  );
}

