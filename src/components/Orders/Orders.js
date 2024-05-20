import { BASE_PROD_URL, wordEnd } from '../../utils/constants';
import './Orders.css';
import { Link } from 'react-router-dom';

export default function Orders({ orders }) {
  const maxCardsShown = 4;

  return(
    <div className="orders">
      { orders.length === 0 ?
        <div className="orders__void">
          <p className="orders__void-text">Вы ещё не сделали ни одного заказа</p>
        </div>
        :
        <ul className="orders__list">
        {
          orders.map((item) => {
            const cardsToShow = item.products.slice(0, maxCardsShown);
            const time = [item.createdAt.slice(8,10), item.createdAt.slice(5,7), item.createdAt.slice(0,4)].join('.');
            return (
              <li key={item.id} className="orders__item">
                <p className="orders__title">Заказ №{item._id.slice(0,5).toUpperCase() + item.createdAt.slice(item.createdAt.indexOf('.') + 1, item.createdAt.indexOf('.') + 4)} от {time}</p>
                <div className="orders__container">
                  <div className="orders__info">
                    <span className="orders__quantity">{`${item.products.length} товар${wordEnd(item.products.length)}`} на сумму <span className="orders__cost">
                       {item.products.reduce((sum, card) => sum + card.productCost * card.quantity, 0)} &#8381;
                    </span></span>
                    <span className="orders__status">Статус: {item.status}</span>
                    <Link to={'/profile/orders/' + item._id} className="orders__details">подробнее</Link>
                  </div>
                  <ul className="orders__product-list">
                    {
                      cardsToShow.map((card) =>
                        <li key={card.productId} className="orders__product">
                          <Link to={'/catalog/' + card.category + '/' + card.productId} className="orders__link">
                            <img className="orders__image" crossOrigin='true' src={BASE_PROD_URL + card?.image} alt='Товар' />
                          </Link>
                        </li>
                      )
                    }
                    {
                      item.products.length > 4 &&
                      <li className="orders__product orders__product_other">
                        <span className="orders__other-products">+ еще {item.products.length - 4}&nbsp;товар{wordEnd(item.products.length - 4)}</span>
                      </li>
                    }
                  </ul>
                </div>
              </li>
            )
          })
        }
      </ul>
      }
    </div>
  );
}

