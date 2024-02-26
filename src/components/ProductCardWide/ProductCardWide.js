import { Link } from 'react-router-dom';
import './ProductCardWide.css';

export default function ProductCardWide({ card }) {
  const {
    productName,
    image,
    productCost,
    sale
  } = card;

  return(
    <li className="wide-list__card">
      <div className="wide-list__img-container">
        <Link to='/' className="wide-list__link wide-list__link_type_image">
          <img className="wide-list__product-img" src={image} alt={productName} />
        </Link>
        <button className="products-list__like" type="button"></button>
      </div>
      <div className="wide-list__info">
        <Link to='/' className="wide-list__link wide-list__link_type_name" >
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
