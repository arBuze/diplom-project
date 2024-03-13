import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './ProductView.css';
import photo from '../../images/user.svg';
import { useEffect, useState } from 'react';

export default function ProductView({ pathname, cards }) {
  const [currentCard, setCurrentCard] = useState({});

  useEffect(() => {
    const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
    const card = cards.find((item) => item.id === Number(id));
    setCurrentCard(card);
  },[])

  function onLinkClick(e) {
    e.preventDefault();
    document.querySelector('#feedback').scrollIntoView({behavior: 'smooth'});
  }

  return(
    <section className="product-view">
      <Breadcrumps productName={currentCard?.productName} />
      <div className="product-view__container">
        <div className="product-view__images-container">
          <div className="product-view__image-container">
            <img className="product-view__image" src={currentCard?.image} alt="" />
            <button className="product-view__arrow product-view__arrow_left" type="button" />
            <button className="product-view__arrow product-view__arrow_right" type="button" />
          </div>
          <div className="product-view__all-images">
            <img className="product-view__small-image" src={currentCard?.image} alt="" />
            <img className="product-view__small-image" src={currentCard?.image} alt="" />
            <img className="product-view__small-image" src={currentCard?.image} alt="" />
            <img className="product-view__small-image" src={currentCard?.image} alt="" />
          </div>
        </div>
        <div className="product-view__info-container">
          <h2 className="product-view__title">{currentCard?.productName}</h2>
          <div className="product-view__rating-info">
            <ul className="products-list__rating products-list__rating_place_product">
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
              <li className="products-list__star"></li>
            </ul>
            <span className="product-view__rating-value">5.0</span>
            <a className="product-view__feedback-link" href="#feedback" onClick={onLinkClick}>Отзывы:
              {/* <span className="product-view__feedback-number"> */} 3{/* </span> */}
            </a>
          </div>
          <div className="product-view__colors">
            <span className="product-view__name">Цвета:</span>
            <div className="product-view__colors-container">
              <label className="product-view__color product-view__color_active">
                <input type="radio" className="product-view__color-input" id='1' name="color" />
                <span className="product-view__pseudo-input">синий</span>
              </label>
              <label className="product-view__color">
                <input type="radio" className="product-view__color-input" id='2' name="color" />
                <span className="product-view__pseudo-input">черный</span>
              </label>
              <label className="product-view__color">
                <input type="radio" className="product-view__color-input" id='3' name="color" />
                <span className="product-view__pseudo-input">красный</span>
              </label>
            </div>
          </div>
          <div className="product-view__cost-info">
            <span className="product-view__price">{currentCard?.productCost}</span>
            <form className="product-view__add-form" name="add-to-cart">
              <button className="product-view__add-btn" type="submit">В корзину</button>
              {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
              </div> */}
            </form>
            <button className="product-view__like-btn" type="button" />
          </div>
          <div className="product-view__other-info">
            <span className="product-view__code">Артикул: 123123</span>
            <span className="product-view__in-stock">в наличии</span>
          </div>
          <div className="product-view__description">
            <h3 className="product-view__description-title">Описание</h3>
            <p className="product-view__paragraph">
              Глянцевый тинт для губ в приглушённом персиковом оттенке придаст губам яркий цвет и сочный сияющий финиш.
            </p>
            <p className="product-view__paragraph">
              Объём: 4гр.
            </p>
            <p className="product-view__paragraph">
            Преимущества:
              Имеет глянцевую текстуру, которая ровным слоем ложится на кожу, не забиваясь в складочки губ.
              Стойкий пигмент оставляет натуральный оттенок на губах, даже когда тинт полностью впитается.
              Имеет среднюю насыщенность пигмента, благодаря чему его удобно наслаивать и регулировать оттенок, а также создавать эффект градиента.
            </p>
            <p className="product-view__paragraph">
            Вспомогательный компонент:
              Гиалуроновая кислота активно увлажняет кожу губ, устраняя сухость и препятствуя шелушениям.
            </p>
          </div>
          <div className="product-view__properties">
            <h3 className="product-view__properties-title">Характеристики</h3>
            <ul className="product-view__properties-list">
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм</span>
              </li>
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
                <span className="product-view__property-value">360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм 360 мм</span>
              </li>
              <li className="product-view__item">
                <span className="product-view__property-name">Длина</span>
                <span className="product-view__property-value">360 мм</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product-view__feedbacks">
        <div className="product-view__feed-container">
          <h3 className="product-view__feed-title">Отзывы</h3>
          <select className="product-view__selection">
            <option className="product-view__option">Сначала новые</option>
            <option className="product-view__option">Сначала старые</option>
            <option className="product-view__option">Сначала полезные</option>
          </select>
          <ul className="products-list__rating products-list__rating_place_product">
            <li className="products-list__star"></li>
            <li className="products-list__star"></li>
            <li className="products-list__star"></li>
            <li className="products-list__star"></li>
            <li className="products-list__star"></li>
          </ul>
          <span className="product-view__feed-rating">4.7 / 5.0</span>
          <button className="product-view__add-feedback-btn" type="button">оставить отзыв</button>
        </div>
        <ul className="product-view__feed-list" id="feedback">
          <li className="product-view__feed-item">
            <div className="product-view__user-info">
              <img className="product-view__user-photo" src={photo} alt='аватар' />
              <span className="product-view__user-name">Иванов И.</span>
              <ul className="products-list__rating products-list__rating_place_product">
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
              <span className="product-view__feed-rating-value">1</span>
              <button className="product-view__down-vote" type="button" />
            </div>
          </li>
          <li className="product-view__feed-item">
            <div className="product-view__user-info">
              <img className="product-view__user-photo" src={photo} alt='аватар' />
              <span className="product-view__user-name">Иванов И.</span>
              <ul className="products-list__rating products-list__rating_place_product">
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
              <span className="product-view__feed-rating-value">1</span>
              <button className="product-view__down-vote" type="button" />
            </div>
          </li>
        </ul>
        <button className="product-view__more-btn" type="button">показать еще</button>
      </div>
    </section>
  )
}
