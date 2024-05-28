import { BASE_PROD_URL } from '../../utils/constants';
import './ProductCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ card, type = 'grid', pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove, onChangeClick, isBuild, onBuildAdd, buildProducts }) {
  const {
    name,
    images,
    price,
    sale,
    _id,
    description,
    category,
    quantity,
    rating,
  } = card;
  const path = '/catalog/' + category + '/' + _id;
  const ratingStars = [1, 2, 3, 4, 5];
  const starsColored = Math.round(rating);
 /*  const isInCart = !pathname.includes('admin') && cart?.find((item) => item.productId === _id); */
  const isForOper = pathname === '/admin/products';

  function handleLikeClick(e) {
    let isFave = e.target.classList.contains('liked');

    if (isFave) {
      onDislike(_id);
      return;
    }
    onLike(_id);
  }

  function handleCartClick() {
    if (cart.find((item) => item.productId === _id)) {
      onCartRemove(_id);
      return;
    }
    onCartAdd(card);
  }

  function changeClick() {
    onChangeClick(_id);
  }

  function handleAddBuild() {
    if (buildProducts.find((item) => item._id === _id)) {
      onBuildAdd(true, card);
    } else {
      onBuildAdd(false, card);
    }
  }

  return(
    type === 'grid' ?
    <li className={`products-list__card ${pathname === '/' ? 'products-list__card_type_slider' : ''}`}>
      <div className="products-list__img-container">
        <Link to={path} className="products-list__link products-list__link_type_image">
          <img className="products-list__product-img" crossOrigin="anonymous" src={BASE_PROD_URL + images[0]} alt={name} />
        </Link>
        { isForOper
          ? <button className="product-list__change" type="button" onClick={changeClick} />
          : <button className={`products-list__like ${faves.find((item) => item === _id) ? 'liked' : ''}`} type="button" onClick={handleLikeClick}></button>
        }
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
          <h3 className="products-list__name">{name}</h3>
        </Link>
        <div className="product-list__cost-info">
          <span className="products-list__cost">{category === 'video-cards' ? (price * 0.9).toFixed(0) : price} &#8381;</span>
          <span className="products-list__cost last-cost">{category === 'video-cards' && price}</span>
          { !isForOper && (isBuild && pathname.includes('catalog')) ?
            <div className="products-list__add-form">
              <button className={`add-build ${buildProducts?.find((item) => item._id === _id) ? 'added-build' : ''}`}
                type="button" onClick={handleAddBuild}>{
                  buildProducts?.find((item) => item._id === _id) ? '-' : '+'
                }</button>
            </div>
            :
            <div className="products-list__add-form">
              <button className={`products-list__add-btn ${(!pathname.includes('admin') && cart?.find((item) => item.productId === _id)) ? 'added' : ''}`}
                type="button" onClick={handleCartClick}></button>
            </div>
          }
        </div>
      </div>
    </li>
    :
    <li className="wide-list__card">
      <div className="wide-list__img-container">
        <Link to={path} className="wide-list__link wide-list__link_type_image">
          <img className="wide-list__product-img" crossOrigin="anonymous" src={BASE_PROD_URL + images[0]} alt={name} />
        </Link>
        { isForOper
          ? <button className="product-list__change" type="button" onClick={changeClick} />
          : <button className={`products-list__like ${faves?.find((item) => item === _id) ? 'liked' : ''}`} type="button" onClick={handleLikeClick}></button>
        }
      </div>
      <div className="wide-list__info">
        <Link to={path} className="wide-list__link wide-list__link_type_name" >
          <h3 className="wide-list__name">{name}</h3>
        </Link>
        <p className="wide-list__description">{description}</p>
        <div className="wide-list__cost-info">
          <div className="wide-list__rating-info">
            <ul className="products-list__rating wide-list__rating">
              {
                ratingStars.map((item) =>
                  <li key={item} className={`products-list__star ${item <= starsColored ? 'products-list__star_full' : ''}`} />
                )
              }
            </ul>
            <span className="wide-list__rating-number">{rating?.toFixed(1)}</span>
          </div>
          <span className="wide-list__status">{quantity > 0 ? '' : 'нет '}в наличии</span>
          <span className="wide-list__cost">{price} &#8381;</span>
          <span className="wide-list__cost last-cost">{sale}</span>
          { !isForOper && (isBuild && pathname.includes('catalog')) ?
            <div className="products-list__add-form">
              <button className={`add-build ${buildProducts?.find((item) => item._id === _id) ? 'added-build' : ''}`}
                type="button" onClick={handleAddBuild}>{
                  buildProducts?.find((item) => item._id === _id) ? '-' : '+'
                }</button>
            </div>
            :
            <div className="products-list__add-form">
              <button className={`products-list__add-btn ${(!pathname.includes('admin') && cart?.find((item) => item.productId === _id)) ? 'added' : ''}`}
                type="button" onClick={handleCartClick}></button>
            </div>
          }
        </div>
      </div>
    </li>
  );
}
