import oneComp from '../images/one-computer.jpg';

export default function ProductCard(props) {
  const {
    productName,
    image,
    productCost,
    sale
  } = props.card;

  return(
    <li className="new-products__product-card">
              <div className="new-products__img-container">
                <img className="new-products__product-img" src={image} alt={productName} />
                <button className="new-products__like" type="button"></button>
                <ul className="new-products__rating">
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                  <li className="new-products__star"></li>
                </ul>
              </div>
              <div className="new-products__info">
                <h3 className="new-products__name">{productName}</h3>
                <span className="new-products__cost">{productCost}</span>
                <span className="new-products__cost last-cost">{sale}</span>
                <form className="new-products__add-form" name="add-to-cart">
                  <button className="new-products__add-btn" type="submit"></button>
                  <div className="new-products__add-multiple">
                    <button className="new-products__decrease-btn" type="submit">-</button>
                    <span className="new-products__quantity">1</span>
                    <button className="new-products__increase-btn" type="submit">+</button>
                  </div>
                </form>
              </div>
            </li>
  );
}
