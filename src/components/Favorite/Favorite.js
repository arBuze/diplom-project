import './Favorite.css'
import '../Cart/Cart.css'
import Breadcrumps from '../Breadcrumps/Breadcrumps';

export default function Favorite() {
  return(
    <section className="favorite">
      <h2 className="favorite__title">Избранное</h2>
      <Breadcrumps />
      <div className="favorite__container">
        <div className="cart__additives">
          <div className="cart__search">
            <input type="text" className="cart__search-input" placeholder="Поиск..." />
            <button type="button" className="cart__search-btn" />
          </div>
            <p className="cart__label">Всего товаров: <span className="cart__number">6</span></p>
          <button className="cart__clear-btn" type="button">очистить</button>
        </div>
      </div>
    </section>
  );
}
