import './ProductsList.css';
import ProductCard from '../ProductCard/ProductCard';
import { useState, useEffect } from 'react';

export default function ProductsList({ cards, width, display, isReversed, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove, onChangeClick }) {
  const maxCards = width >= 1440 ? 24 : width >= 1280 ? 18 : width >= 768 ? 12 : 8;
  const [cardsVisible, setCardsVisible] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [numberOfHiddenCards, setNumberOfHiddenCards] = useState(0);
  const [numberOfSwipes, setNumberOfSwipes] = useState(0);
  const [swipeDots, setSwipeDots] = useState([]);
  const [translateLength, setTranslateLength] = useState(0);

  useEffect(() => {
    setNumberOfCards(maxCards);
  }, [maxCards])

  useEffect(() => {
    setCardsVisible(cards.slice(numberOfHiddenCards, numberOfHiddenCards + numberOfCards));
  }, [numberOfCards, numberOfHiddenCards, cards, isReversed])

  useEffect(() => {
    let array = [];
    for (let i = 0; i < Math.ceil(cards.length / maxCards); i = i + 1) {
      array.push(i);
    }
    setSwipeDots(array);
  }, [maxCards, cards])

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  function handleShowMoreClick() {
    setNumberOfCards(numberOfCards + maxCards);
    setNumberOfSwipes(numberOfSwipes + 1);
    if ((numberOfSwipes > 0) && (swipeDots.length - numberOfSwipes >= 4)) {
      setTranslateLength((numberOfSwipes - 1) * -32)
    }
  }

  function handleDotClick(e) {
    const slideNumber = Number(e.target.id);
    setNumberOfCards(maxCards);
    setNumberOfHiddenCards(slideNumber * maxCards);
    if (slideNumber < numberOfSwipes) {
      if (slideNumber > 1 && slideNumber < swipeDots.length - 3) {
        setTranslateLength((slideNumber - 2) * -32)
      }
    }
    if (slideNumber > numberOfSwipes) {
      if (slideNumber > 2 && slideNumber < swipeDots.length - 2) {
        setTranslateLength((slideNumber - 2) * -32);
      }
    }
    setNumberOfSwipes(slideNumber);
    scrollToTop();
  }

  function handleArrowClick(e) {
    if (e.target.id === 'left') {
      if (numberOfSwipes === 0) return;
      setNumberOfHiddenCards((numberOfSwipes - 1) * maxCards);
      setNumberOfSwipes(numberOfSwipes - 1);
      if ((numberOfSwipes < swipeDots.length - 1) && (numberOfSwipes > 2)) {
        setTranslateLength((numberOfSwipes - 3) * -32)
      }
    } else {
      if (numberOfSwipes === swipeDots.length - 1) return;
      setNumberOfHiddenCards((numberOfSwipes + 1) * maxCards);
      setNumberOfSwipes(numberOfSwipes + 1);
      if ((numberOfSwipes > 0) && (swipeDots.length - numberOfSwipes >= 4)) {
        setTranslateLength((numberOfSwipes - 1) * -32)
      }
    }
    scrollToTop();
  }

  function handleBeginBtnClick() {
    if (numberOfSwipes === 0) return;
    setNumberOfSwipes(0);
    setTranslateLength(0);
    setNumberOfCards(maxCards);
    setNumberOfHiddenCards(0);
    scrollToTop();
  }

  function handleEndBtnClick() {
    if (numberOfSwipes === swipeDots.length - 1) return;
    setNumberOfSwipes(swipeDots.length - 1);
    if (swipeDots.length > 5) {
      setTranslateLength((swipeDots.length - 5) * -32);
    }
    setNumberOfCards(maxCards);
    setNumberOfHiddenCards((swipeDots.length - 1) * maxCards);
    scrollToTop();
  }

  return(
    <div className={`products ${pathname.includes('sales') ? 'products_sales' : ''} ${cards.length === 0 ? 'products_void' : ''}`}>
      { cards.length === 0 ?
        <p className="products__void-text">Ничего не найдено</p>
        :
        <ul className={`products__list ${display === 'grid' ? 'products__list_type_grid' : 'products__list_type_list'}`}>
        {
          cardsVisible.map((item) => {
            return (<ProductCard key={item.id} card={item} type={display} pathname={pathname}
              faves={faves} cart={cart}
              onLike={onLike} onDislike={onDislike}
              onCartAdd={onCartAdd} onCartRemove={onCartRemove}
              onChangeClick={onChangeClick} />);
          })
        }
      </ul>
      }
      { cards.length > (cardsVisible.length + numberOfHiddenCards) &&
        <button className="products__more-btn" type="button" onClick={handleShowMoreClick}>
          показать еще
        </button>
      }
      { cards.length > maxCards &&
        <div className="products__slider">
          <div className="products__slider-container">
            <div className="products__dots-container">
              <ul className="products__dots" style={{transform: `translate(${translateLength}px)`}}>
                {
                  swipeDots.map((item) => {
                    return(
                      <li key={item}
                        className={`products__dot ${numberOfSwipes === item ? 'products__dot_active' : ''}`}
                        id={item} onClick={handleDotClick} >
                        {item + 1}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <span className={`products__arrow products__arrow_type_left ${numberOfSwipes === 0 ? 'products__arrow_disabled' : ''}`}
              id="left" onClick={handleArrowClick} />
            <span className={`products__arrow products__arrow_type_right ${numberOfSwipes === swipeDots.length - 1 ? 'products__arrow_disabled' : ''}`}
              id="right" onClick={handleArrowClick} />
            <span className={`products__arrow products__arrow_type_begin ${numberOfSwipes === 0 ? 'products__arrow_disabled' : ''}`}
              onClick={handleBeginBtnClick} />
            <span className={`products__arrow products__arrow_type_end ${numberOfSwipes === swipeDots.length - 1 ? 'products__arrow_disabled' : ''}`}
              onClick={handleEndBtnClick} />
          </div>
        </div>
      }
    </div>
  );
};
