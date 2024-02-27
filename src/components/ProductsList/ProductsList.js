import './ProductsList.css';
import ProductCard from '../ProductCard/ProductCard';
import { cards } from '../../utils/constants';
import { useState, useEffect } from 'react';
import ProductCardWide from '../ProductCardWide/ProductCardWide';

export default function ProductsList({ width, display }) {
  const maxCards = width >= 1280 ? 24 : width >= 768 ? 18 : 8;
  const cardsToAdd = width >= 1280 ? 12 : width >= 768 ? 9 : 4;
  const [cardsVisible, setCardsVisible] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [numberOfSwipes, setNumberOfSwipes] = useState(0);
  const [swipeDots, setSwipeDots] = useState([]);

  useEffect(() => {
    setNumberOfCards(maxCards);
  }, [maxCards])

  useEffect(() => {
    setCardsVisible(cards.slice(0, numberOfCards));
  }, [numberOfCards, cards])

  useEffect(() => {
    let array = [];
    for(let i = 0; i <= (cards.length / maxCards); i = i + 1) {
      array.push(i);
    }
    setSwipeDots(array);
  }, [cards])

  function handleClick() {
    setNumberOfCards(numberOfCards + cardsToAdd);
  }

  return(
    <div className="products">
      <ul className={`products__list ${display === 'grid' ? 'products__list_type_grid' : 'products__list_type_list'}`}>
        { display === 'grid' ?
          cards.map((item) => {
            return(<ProductCard key={item.id} card={item} />)
          })
          :
          cards.map((item) => {
            return(<ProductCardWide key={item.id} card={item} />)
          })
        }
      </ul>
      { cards.length > cardsVisible.length &&
        <button className="products__more-btn" type="button" onClick={handleClick}>
          показать еще
        </button>
      }
      <div className="products__slider">
        <div className="products__slider-container">
          <div className="products__dots-container">
            <ul className="products__dots">
              <li className="products__dot">1</li>
              <li className="products__dot">2</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
              <li className="products__dot">3</li>
            </ul>
          </div>
          <button className="products__arrow products__arrow_type_left" type="button" />
          <button className="products__arrow products__arrow_type_right" type="button" />
        </div>
      </div>
    </div>
  );
};
