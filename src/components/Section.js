/* import oneComp from '../images/one-computer.jpg'; */
import { useState } from "react";
import ProductCard from "./ProductCard";
import { cards } from "../utils/constants";

export default function Section(props) {
  const [slidePoint, setSlidePoint] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);
  const card = document.querySelector('.new-products__product-card');
  let slideWidth = card.offsetWidth;
  const transform = {
    transform: `translateX(${slidePoint}px)`,
  }
  function handleClick(e) {
    let direction = e.target.id;
    let sliderWidth = e.target.parentElement.offsetWidth;
    let maxCards = Math.floor(sliderWidth / slideWidth);
    console.log(maxCards);
    if (direction === 'left' && slideNumber) {
      setSlideNumber(slideNumber + 1);
      setSlidePoint(slideWidth * (slideNumber + 1));
      console.log(slideNumber, slidePoint);
    }
    if (direction === 'right' && (Math.abs(slideNumber) < (cards.length - maxCards))) {
      setSlideNumber(slideNumber - 1);
      setSlidePoint(slideWidth * (slideNumber - 1));
      console.log(slidePoint, cards.length * Math.abs(slideWidth) - sliderWidth);
    }
  }

  return(
    <section className="new-products">
      <h2 className="new-products__title">Новинки</h2>
      <div className="new-products__show">
        <div className="new-products__slider">
          <ul className="new-products__list" style={transform}>
            {
              cards.map((item) => {
                return(<ProductCard key={item.id} card={item} />)
              })
            }
          </ul>
        </div>

        <div className="new-products__points"></div>
        <button className="new-products__arrow arrow arrow_type_left" type="button" id="left"
          onClick={handleClick} />
        <button className="new-products__arrow arrow arrow_type_right" type="button" id="right"
          onClick={handleClick} />
      </div>
    </section>
  );
}
