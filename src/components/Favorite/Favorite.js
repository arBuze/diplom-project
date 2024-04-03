import './Favorite.css'
import '../Cart/Cart.css'
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import ProductsList from '../ProductsList/ProductsList';
import { useEffect } from 'react';

export default function Favorite({ cards, width, pathname, faves, cart, onLike, onDislike, onCartAdd, onCartRemove }) {
  useEffect(() => {
    console.log(faves);
  },[])

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
          <p className="cart__label">Всего товаров: <span className="cart__number">{faves.length}</span></p>
        </div>
      </div>
      { faves.length === 0 ?
        <div className="favorite__void">
          <p className="favorite__void-text">Нет избранных товаров</p>
        </div>
        :
        <ProductsList cards={cards} width={width}
          display='grid' pathname={pathname}
          faves={faves} cart={cart}
          onLike={onLike} onDislike={onDislike}
          onCartAdd={onCartAdd} onCartRemove={onCartRemove} />
      }
    </section>
  );
}
