import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './ProductView.css';
import { cards } from '../../utils/constants';
import photo from '../../images/user.svg';

export default function ProductView({ card }) {
  const {
    productName,
    image,
    productCost,
    sale,
    id
  } = card;

  return(
    <section className="product-view">
      <Breadcrumps productName='Aboba' />
      <div className="product-view__container">
        <div className="product-view__images-container">

        </div>
        <div className="product-view__info-container">
          <h2 className="product-view__title">{productName}</h2>
          <div className="product-view__other-info">
            <span className="product-view__code">Артикул: 123123</span>
            <span className="product-view__in-stock">в наличии</span>
            <div className="product-view__rating-info">
              <ul className="products-list__rating">
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
              </ul>
              <a className="product-view__feedback-link" href="#feedback">Отзывы:</a>
              <span className="product-view__feedback-number">3</span>
            </div>
          </div>
          <div className="product-view__cost-info">
            <span className="product-view__price">{productCost}</span>
            <form className="product-view__add-form" name="add-to-cart">
              <button className="product-view__add-btn" type="submit">Купить</button>
              {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
              </div> */}
            </form>
            <button className="product-view__like-btn" type="button" />
          </div>
          <div className="product-view__colors">
            <span className="product-view__name">Цвета:</span>
            <label className="product-view__color">
              <input type="radio" className="product-view__color-input" name="color" />
              <span className="product-view__pseudo-input"></span>
            </label>
            <label className="product-view__color">
              <input type="radio" className="product-view__color-input" name="color" />
              <span className="product-view__pseudo-input"></span>
            </label>
            <label className="product-view__color">
              <input type="radio" className="product-view__color-input" name="color" />
              <span className="product-view__pseudo-input"></span>
            </label>
          </div>
          <div className="product-view__description">
            <h3 className="product-view__description-title">Описание</h3>
            <p className="product-view__paragraph"></p>
          </div>
          <div className="product-view__properties">
            <h3 className="product-view__properties-title">Характеристики</h3>
            <ul className="product-view__properties-list">
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
            </ul>
            <button className="product-view__unfold-btn" type="button">Развернуть</button>
          </div>
        </div>
      </div>
      <div className="product-view__feedbacks">
        <div className="product-view__feed-container">
          <h3 className="product-view__feed-title">Отзывы</h3>
          <section className="product-view__selection">
            <option className="product-view__option">Сначала новые</option>
            <option className="product-view__option">Сначала старые</option>
            <option className="product-view__option">Сначала полезные</option>
          </section>
        </div>
        <ul className="product-view__feed-list" id="feedback">
          <li className="product-view__feed-item">
            <div className="product-view__user-info">
              <img className="product-view__user-photo" src={photo} />
              <span className="product-view__user-name">Иванов И.</span>
              <ul className="products-list__rating">
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
                <li className="products-list__star"></li>
             </ul>
             <span className="product-view__feed-data">10.02.24 13:02</span>
            </div>
            <div className="product-view__comment-container">
              <span className="product-view__part-name">Достоинства</span>
              <p className="product-view__comment">Очень красивый, прочный, легкий, мощный, стильный, цвет приятный, хорошая подстветка, гладкий, все помещается, хорошее качество</p>
            </div>
            <div className="product-view__comment-container">
              <span className="product-view__part-name">Недостатки</span>
              <p className="product-view__comment">Очень красивый, прочный, легкий, мощный, стильный, цвет приятный, хорошая подстветка, гладкий, все помещается, хорошее качество</p>
            </div>
            <div className="product-view__comment-container">
              <span className="product-view__part-name">Комментарий</span>
              <p className="product-view__comment">Очень красивый, прочный, легкий, мощный, стильный, цвет приятный, хорошая подстветка, гладкий, все помещается, хорошее качество</p>
            </div>
            <div className="product-view__feed-rating">
              <button className="product-view__up-vote" type="button" />
              <span className="product-view__feed-rating-value">0</span>
              <button className="product-view__down-vote" type="button" />
            </div>
          </li>
        </ul>
        <button className="product-view__unfold-btn" type="button">Развернуть</button>
      </div>
    </section>
  )
}
