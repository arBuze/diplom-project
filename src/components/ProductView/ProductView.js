import Breadcrumps from '../Breadcrumps/Breadcrumps';
import './ProductView.css';
import photo from '../../images/user.svg';
import { useEffect, useState } from 'react';
import { BASE_PROD_URL } from '../../utils/constants';

export default function ProductView({ pathname, cards, onLike, onCartAdd, faves, cart, onDislike, onCartRemove, isLoggedIn }) {
  const [currentCard, setCurrentCard] = useState({});
  const ratingStars = [1, 2, 3, 4, 5];
  const starsColored = Math.round(4.4);
  const isInCart = cart.find((item) => item.id === currentCard?._id);

  useEffect(() => {
    const id = pathname.slice(pathname.lastIndexOf('/') + 1,);
    const card = cards.find((item) => item._id === id);
    setCurrentCard(card);
  }, [cards, pathname])

  function onLinkClick(e) {
    e.preventDefault();
    document.querySelector('#feedback').scrollIntoView({behavior: 'smooth'});
  }

  function handleLikeClick(e) {
    let isFave = e.target.classList.contains('liked');

    if (isFave) {
      onDislike(currentCard._id);
      return;
    }
    onLike(currentCard._id);
  }

  function handleCartClick() {
    if (isInCart) {
      onCartRemove(currentCard._id);
      return;
    }
    onCartAdd(currentCard);
  }

  return(
    <section className="product-view">
      <Breadcrumps productName={currentCard?.name} />
      <div className="product-view__container">
        <div className="product-view__images-container">
          <div className="product-view__image-container">
            <img className="product-view__image" crossOrigin="true" src={currentCard?.images && (BASE_PROD_URL + currentCard?.images[0])} alt="" />
            <button className="product-view__arrow product-view__arrow_left" type="button" />
            <button className="product-view__arrow product-view__arrow_right" type="button" />
          </div>
          <div className="product-view__all-images">
            {
              currentCard?.images?.map((img) =>
                <img className="product-view__small-image" crossOrigin="true" src={BASE_PROD_URL + img} alt="" />
              )
            }
          </div>
        </div>
        <div className="product-view__info-container">
          <h2 className="product-view__title">{currentCard?.name}</h2>
          <div className="product-view__rating-info">
            <ul className="products-list__rating products-list__rating_place_product">
              {
                ratingStars.map((item) =>
                  <li key={item} className={`products-list__star ${item <= starsColored ? 'products-list__star_full' : ''}`} />
                )
              }
            </ul>
            <span className="product-view__rating-value">{/* currentCard?.rating?.toFixed(1) */4.4}</span>
            <a className="product-view__feedback-link" href="#feedback" onClick={onLinkClick}>Отзывы:
              {/* <span className="product-view__feedback-number"> */} 3{/* </span> */}
            </a>
          </div>
          {/* <div className="product-view__colors">
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
          </div> */}
          <div className="product-view__cost-info">
            <span className="product-view__price">{currentCard?.price} &#8381;</span>
            <div className="product-view__add-form">
              <button className={`product-view__add-btn ${isInCart ? 'view-added' : ''}`} type="button"
                onClick={handleCartClick}>
                {`${isInCart ? 'В корзине' : 'В корзину'}`}
              </button>
              {/* <div className="products-list__add-multiple">
              <button className="products-list__decrease-btn" type="submit">-</button>
              <span className="products-list__quantity">1</span>
              <button className="products-list__increase-btn" type="submit">+</button>
              </div> */}
            </div>
            <button className={`product-view__like-btn ${faves.find((item) => item === currentCard?._id) ? 'liked' : ''}`} type="button"
              onClick={handleLikeClick} />
          </div>
          <div className="product-view__other-info">
            <span className="product-view__code">Артикул: {currentCard?.articule}</span>
            <span className="product-view__in-stock">{currentCard?.quantity > 0 ? '' : 'нет '}в наличии</span>
          </div>
          <div className="product-view__description">
            <h3 className="product-view__description-title">Описание</h3>
            {
              currentCard?.description?.split('\n').map((item) =>
                <p className="product-view__paragraph">
                  {item}
                </p>
              )
            }
          </div>
          <div className="product-view__properties">
            <h3 className="product-view__properties-title">Характеристики</h3>
            <ul className="product-view__properties-list">
              {
                currentCard?.characteristics?.map((item) =>
                  <li className="product-view__item">
                    <span className="product-view__property-name">{item.name}</span>
                    <span className="product-view__property-value">{item.value}</span>
                  </li>
                )
              }
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
            {
              ratingStars.map((item) =>
                <li key={item} className={`products-list__star ${item <= starsColored ? 'products-list__star_full' : ''}`} />
              )
            }
          </ul>
          <span className="product-view__feed-rating">{/* currentCard?.rating?.toFixed(1) */4.4} / 5.0</span>
          {isLoggedIn && <button className="product-view__add-feedback-btn" type="button">оставить отзыв</button>}
        </div>
        <ul className="product-view__feed-list" id="feedback">
          <li className="product-view__feed-item">
            <div className="product-view__user-info">
              <img className="product-view__user-photo" crossOrigin="true" src={photo} alt='аватар' />
              <span className="product-view__user-name">Иванов И.</span>
              <ul className="products-list__rating products-list__rating_place_product">
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star "></li>
             </ul>
             <span className="product-view__feed-data">10.05.24 13:02</span>
            </div>
            <div className="product-view__comment-container">
              <span className="product-view__part-name">Достоинства</span>
              <p className="product-view__comment">
                Подойдет под длинную видеокарту, есть место для кабель менеджмента
              </p>
            </div>
            <div className="product-view__comment-container">
              <span className="product-view__part-name">Недостатки</span>
              <p className="product-view__comment">Очень тонкий металл. Нет USB 3.0</p>
            </div>
            <div className="product-view__comment-container">
              <span className="product-view__part-name">Комментарий</span>
              <p className="product-view__comment">Передняя панель фактурная - не маркая и не глянцевая, возле кнопок глянцевая вставка, кнопки и разъемы рабочие</p>
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
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
                <li className="products-list__star products-list__star_full"></li>
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
