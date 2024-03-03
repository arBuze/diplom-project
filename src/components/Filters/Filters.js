import { useState } from 'react';
import './Filters.css';

export default function Filters({ width }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10);
  const [isVisible, setIsVisible] = useState(true);

  function onPriceChange(e) {
    const price = Number(e.target.value);
    if (e.target.id === 'left') {
      setMinPrice(price);
      if (price > maxPrice) {
        setMinPrice(maxPrice);
      }
    } else {
      setMaxPrice(price);
      if (price < minPrice) {
        setMaxPrice(minPrice);
      }
    }
  }

  function onHideClick() {
    setIsVisible(!isVisible);
  }

  return(
    <form className="filters" name="filters">
      <fieldset className="filters__field filters__search-field" name="category-search">
        <input className="filters__search-input" type="text" placeholder="Поиск по категории..." />
        <button className="filters__search-btn" />
      </fieldset>
      <fieldset className="filters__field filters__main-check" name="main">
        <label className="filters__check-name">
          <input type="checkbox" className="filters__check" name="in-stock" />
          <span className="filters__pseudo-check" />
          В наличии
        </label>
        <label className="filters__check-name">
          <input type="checkbox" className="filters__check" name="rating" />
          <span className="filters__pseudo-check" />
          Рейтинг 4 и выше
        </label>
      </fieldset>
      <fieldset className="filters__field filters__field_type_price" name="price">
        <div className="filters__filter-name">
          <span className="filters__filter-title">Цена</span>
          <button className={`filters__hide-btn ${!isVisible ? 'filters__hide-btn_active' : ''}`} type="button" onClick={onHideClick} />
        </div>
        { isVisible &&
          <div className="filters__input">
            <div className="filters__price-inputs">
              <input type="number" className="filters__price-input" />
              <input type="number" className="filters__price-input" />
            </div>
            { width >= 768 &&
              <div className="filters__wrapper">
                <div className="filters__container">
                  <div className="filters__slider-track" style={{background: `linear-gradient(to right, #D4D4D4 ${minPrice}%, #98AEEB ${minPrice}%, #98AEEB ${maxPrice}%, #D4D4D4 ${maxPrice}%)`}}></div>
                  <input type="range" min="0" max="100" step="1" className="filters__slider" id='left'
                    value={minPrice} onChange={onPriceChange} />
                  <input type="range" min="0" max="100" step="1" className="filters__slider" id='right'
                    value={maxPrice} onChange={onPriceChange} />
                </div>
              </div>
            }
          </div>
        }
      </fieldset>
      <fieldset className="filters__field filters__field_type_producer">
        <div className="filters__filter-name">
          <span className="filters__filter-title">Производители</span>
          <button className={`filters__hide-btn ${!isVisible ? 'filters__hide-btn_active' : ''}`} type="button" onClick={onHideClick} />
        </div>
        <div className="filters__checks-container">
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="producer" />
            <span className="filters__pseudo-check" />
            Выбрать все
          </label>
        </div>
      </fieldset>
      {/* <fieldset className="filters__field filters__field_type_factor">
        <div className="filters__filter-name">
          <span className="filters__filter-title">Форм-фактор материнских плат</span>
          <button className="filters__hide-btn" type="button" onClick={onHideClick} />
        </div>
        <div className="filters__checks-container">
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="factor" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="factor" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="factor" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="factor" />
            Выбрать все
          </label>
          <label className="filters__check-name">
            <input type="checkbox" className="filters__check" name="factor" />
            Выбрать все
          </label>
        </div>
      </fieldset> */}
      <button type="reset" className="filters__reset-btn">Сбросить</button>
    </form>
  );
};

