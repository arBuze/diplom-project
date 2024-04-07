import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ card, type = 'grid', pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove }) {
  const {
    productName,
    image,
    productCost,
    sale,
    id,
    category,
    rating,
  } = card;
  const path = '/catalog/' + category + '/' + id;
  const ratingStars = [1, 2, 3, 4, 5];
  const starsColored = Math.round(rating);
  const isInCart = cart.find((item) => item.id === id);

  function handleLikeClick(e) {
    let isFave = e.target.classList.contains('liked');

    if (isFave) {
      onDislike(id);
      return;
    }
    onLike(id);
  }

  function handleCartClick(e) {
    if (isInCart) {
      onCartRemove(id);
      return;
    }
    onCartAdd(card);
  }

  return(
    type === 'grid' ?
    <li className={`products-list__card ${pathname === '/' ? 'products-list__card_type_slider' : ''}`}>
      <div className="products-list__img-container">
        <Link to={path} className="products-list__link products-list__link_type_image">
          <img className="products-list__product-img" src={image} alt={productName} />
        </Link>
        <button className={`products-list__like ${faves.find((item) => item === id) ? 'liked' : ''}`} type="button" onClick={handleLikeClick}></button>
        <ul className="products-list__rating">
          {
            ratingStars.map((item) =>
              <li key={item} className={`products-list__star ${item <= starsColored ? 'products-list__star_full' : ''}`} />
            )
          }
        </ul>
      </div>
      <div className="products-list__info">
        <Link to={path} className="products-list__link products-list__link_type_name">
          <h3 className="products-list__name">{productName}</h3>
        </Link>
        <div className="product-list__cost-info">
          <span className="products-list__cost">{productCost} &#8381;</span>
          <span className="products-list__cost last-cost">{sale}</span>
          <div className="products-list__add-form">
            <button className={`products-list__add-btn ${isInCart ? 'added' : ''}`} type="button" onClick={handleCartClick}></button>
            {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
            </div> */}
          </div>
        </div>
      </div>
    </li>
    :
    <li className="wide-list__card">
      <div className="wide-list__img-container">
        <Link to={path} className="wide-list__link wide-list__link_type_image">
          <img className="wide-list__product-img" src={image} alt={productName} />
        </Link>
        <button className={`products-list__like ${faves.find((item) => item === id) ? 'liked' : ''}`} type="button" onClick={handleLikeClick}></button>
      </div>
      <div className="wide-list__info">
        <Link to={path} className="wide-list__link wide-list__link_type_name" >
          <h3 className="wide-list__name">{productName}</h3>
        </Link>
        <p className="wide-list__description">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.
        </p>
        <div className="wide-list__cost-info">
          <div className="wide-list__rating-info">
            <ul className="products-list__rating wide-list__rating">
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
            </ul>
            <span className="wide-list__rating-number">30</span>
          </div>
          <span className="wide-list__status">нет в наличии</span>
          <span className="wide-list__cost">{`${productCost} &#8381;`}</span>
          <span className="wide-list__cost last-cost">{sale}</span>
          <div className="products-list__add-form">
            <button className={`products-list__add-btn ${isInCart ? 'added' : ''}`} type="button" onClick={handleCartClick}></button>
            {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
            </div> */}
          </div>
        </div>
      </div>
    </li>
  );
}
