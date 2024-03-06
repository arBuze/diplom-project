import oneComp from '../../images/one-computer.jpg';
import './ProductCard.css';
import { useLocation, Link } from 'react-router-dom';

export default function ProductCard({ card, onProductClick, type = 'grid' }) {
  const {
    productName,
    image,
    productCost,
    sale,
    id
  } = card;

  const { pathname } = useLocation();

  function handleLinkClick() {
    console.log(card);
    onProductClick(card);
  }

  return(
    type === 'grid' ?
    <li className={`products-list__card ${pathname === '/' ? 'products-list__card_type_slider' : ''}`}>
      <div className="products-list__img-container">
        <Link to={pathname + '/' + id} className="products-list__link products-list__link_type_image"
          onClick={handleLinkClick}>
          <img className="products-list__product-img" src={image} alt={productName} />
        </Link>
        <button className="products-list__like" type="button"></button>
        <ul className="products-list__rating">
          <li className="products-list__star"></li>
          <li className="products-list__star"></li>
          <li className="products-list__star"></li>
          <li className="products-list__star"></li>
          <li className="products-list__star"></li>
        </ul>
      </div>
      <div className="products-list__info">
        <Link to={pathname + id} className="products-list__link products-list__link_type_name"
          onClick={handleLinkClick}>
          <h3 className="products-list__name">{productName}</h3>
        </Link>
        <div className="product-list__cost-info">
          <span className="products-list__cost">{productCost}</span>
          <span className="products-list__cost last-cost">{sale}</span>
          <form className="products-list__add-form" name="add-to-cart">
            <button className="products-list__add-btn" type="submit"></button>
            {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
            </div> */}
          </form>
        </div>
      </div>
    </li>
    :
    <li className="wide-list__card">
      <div className="wide-list__img-container">
        <Link to={pathname + '/' + id} className="wide-list__link wide-list__link_type_image">
          <img className="wide-list__product-img" src={image} alt={productName} />
        </Link>
        <button className="products-list__like" type="button"></button>
      </div>
      <div className="wide-list__info">
        <Link to={pathname + '/' + id} className="wide-list__link wide-list__link_type_name" >
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
          <span className="wide-list__cost">{productCost}</span>
          <span className="wide-list__cost last-cost">{sale}</span>
          <form className="products-list__add-form" name="add-to-cart">
            <button className="products-list__add-btn" type="submit"></button>
            {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
            </div> */}
          </form>
        </div>
      </div>
    </li>
  );
}
