import oneComp from '../../images/one-computer.jpg';
import './ProductCard.css';
import { useLocation } from 'react-router-dom';

export default function ProductCard({ card }) {
  const {
    productName,
    image,
    productCost,
    sale
  } = card;

  const { pathname } = useLocation();

  return(
    <li className={`products-list__card ${pathname === '/' ? 'products-list__card_type_slider' : ''}`}>
      <div className="products-list__img-container">
        <img className="products-list__product-img" src={image} alt={productName} />
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
        <h3 className="products-list__name">{productName}</h3>
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
  );
}
