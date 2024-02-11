/* import oneComp from '../images/one-computer.jpg'; */
import useWindowDimensions from '../hooks/useWindowDimensions';
import ProductCard from "./ProductCard";
import { useEffect, useState } from 'react';

export default function Section({ title, cards }) {
  const [numberOfSwipes, setNumberOfSwipes] = useState(0);
  const [swipeDots, setSwipeDots] = useState([]);
  const { width } = useWindowDimensions();
  const numberOfCards = width >= 1280 ? 5 : 4;

  useEffect(() => {
    let array = [];
    for(let i = 0; i <= cards.length - numberOfCards; i = i + 1) {
      array.push(i);
    }
    setSwipeDots(array);
  }, [numberOfCards])

  function swipe(e) {
    if (e.target.id === 'right') {
      setNumberOfSwipes(numberOfSwipes + 1);
    } else {
      setNumberOfSwipes(numberOfSwipes - 1);
    }
  }

  function flip(e) {
    setNumberOfSwipes(Number(e.target.id));
  }

  return(
    <section className="new-products">
        {/* <div className="new-products__decor"> */}
          <h2 className="new-products__title">{title}</h2>
       {/*  </div> */}
        <div className="new-products__show">
          <div className="new-products__container">
            <ul className="new-products__list" style={{transform: `translate(${-265 * numberOfSwipes}px)`}}>
              {
                cards.map((item) => {
                  return(<ProductCard key={item.id} card={item} />)
                })
              }
            </ul>
          </div>
          <ul className="new-products__dots">
            {
              swipeDots.map((item) => {
                return(<span key={item} className={`new-products__dot ${numberOfSwipes === item ? 'new-products__dot_active' : ''}`} id={item}
                  onClick={flip} />)
              })
            }
          </ul>
          <button className="new-products__arrow arrow arrow_type_left" id="left" type="button"
            onClick={swipe} disabled={numberOfSwipes === 0} />
          <button className="new-products__arrow arrow arrow_type_right" id="right" type="button"
            onClick={swipe} disabled={numberOfSwipes === cards.length - numberOfCards} />
        </div>
        </section>
  );
}
