import { wordEnd } from '../../utils/constants';
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
            return (
              <li key={item.id} className="orders__item">
                <p className="orders__title">Заказ №1283 от {item.createdAt}</p>
                <div className="orders__container">
                  <div className="orders__info">
                    <span className="orders__quantity">{`${item.products.length} товар${wordEnd(item.products.length)}`} на сумму <span className="orders__cost">
                       {item.products.reduce((sum, card) => sum + card.productCost * card.quantity, 0)} &#8381;
                    </span></span>
                    <span className="orders__status">Статус: {item.status}</span>
                    <Link to={'/profile/orders/' + item.id} className="orders__details">подробнее</Link>
                  </div>
                  <ul className="orders__product-list">
                    {
                      cardsToShow.map((card) =>
                        <li key={card.id} className="orders__product">
                          <Link to={'/catalog/' + card.category + '/' + card.id} className="orders__link">
                            <img className="orders__image" src={card.image} alt='Товар' />
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

