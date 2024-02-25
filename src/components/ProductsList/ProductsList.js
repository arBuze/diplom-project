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

  useEffect(() => {
    setNumberOfCards(maxCards);
  }, [maxCards])

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
      <button className="products__more-btn" type="button">показать еще</button>
      <div className="products__slider">
        <ul className="products__dots">
          <li className="products__dot">1</li>
        </ul>
        <button className="products__arrow products__arrow_type_left" type="button" />
        <button className="products__arrow products__arrow_type_right" type="button" />
      </div>
    </div>
  );
};
