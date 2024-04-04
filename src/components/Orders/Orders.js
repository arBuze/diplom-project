import './Orders.css';
import { Link } from 'react-router-dom';
import comp from '../../images/giorgio-trovato-v_bri4iVuiM-unsplash.jpg';

export default function Orders({ orders }) {
  const maxCardsShown = 4;

  return(
    <div className="orders">
      <ul className="orders__list">
        {
          orders.map((item) => {
            const cardsToShow = item.products.slice(0, maxCardsShown);
            return (
              <li className="orders__item">
                <p className="orders__title">Заказ №1283 от {item.createdAt}</p>
                <div className="orders__container">
                  <div className="orders__info">
                    <span className="orders__quantity">{`${item.products.length} товар${[11, 12, 13, 14].indexOf(item.products.length % 100) !== -1 ? 'ов' : item.products.length % 10 === 1 ? '' : [2, 3, 4].indexOf(item.products.length % 10) !== -1 ? 'а' : 'ов'}`} на сумму <span className="orders__cost">
                       {item.products.reduce((sum, card) => sum + card.productCost * card.quantity, 0)} &#8381;
                    </span></span>
                    <span className="orders__status">Статус: {item.status}</span>
                    <Link to={'/profile/orders/' + item.id} className="orders__details">подробнее</Link>
                  </div>
                  <ul className="orders__product-list">
                    {
                      cardsToShow.map((card) =>
                        <li className="orders__product">
                          <Link to={'/catalog/' + card.category + '/' + card.id} className="orders__link">
                            <img className="orders__image" src={card.image} alt='Товар' />
                          </Link>
                        </li>
                      )
                    }
                    {
                      item.products.length > 4 &&
                      <li className="orders__product orders__product_other">
                        <span className="orders__other-products">+ еще {item.products.length - 4}&nbsp;товар{[11, 12, 13, 14].indexOf((item.products.length - 4) % 100) !== -1 ? 'ов' : (item.products.length - 4) % 10 === 1 ? '' : [2, 3, 4].indexOf((item.products.length - 4) % 10) !== -1 ? 'а' : 'ов'}</span>
                      </li>
                    }
                  </ul>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

