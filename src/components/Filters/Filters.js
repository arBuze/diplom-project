import { useState } from 'react';
import './Filters.css';

export default function Filters({ width, limits, characteristics, pathname, onCostChange, onCharsChange }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [isVisible, setIsVisible] = useState(true);
  const [values, setValues] = useState({});
  const [checks, setChecks] = useState([]);
  const percent = (limits.max - limits.min) / 100;

  /* useState(() => {
    let fils = JSON.parse(localStorage.getItem('filter'));
    if (fils) {
      if (fils.path.includes(pathname) && fils.pars.chars && fils.pars.chars.length !== 0) {
        console.log(fils.pars.chars, 'awda');
        setChecks(fils.pars.chars);
      }
      if (fils.path.includes(pathname) && fils.pars.price) {
        const { min, max } = fils.pars.price;
        setValues({
          min,
          max
        });
        setMinPrice(Math.round((min - limits.min)/percent));
        setMaxPrice(Math.round((max - limits.min)/percent));
      }
    }
  }, []) */

  function onPriceInputChange(e) {
    const { name, value } = e.target;
    const valueNum = Number(value);
    if (isNaN(valueNum)) {
      values[name] ? setValues({
        ...values
      })
      : setValues({
        ...values,
        [name]: limits[name]
      });
      return;
    }
    if (name === 'min') {
        setValues({
          ...values,
          min: valueNum
        });
        setMinPrice(Math.round((valueNum - limits.min)/percent));
        onCostChange(valueNum, values.max);
    } else {
        setValues({
          ...values,
          max: valueNum
        });
        setMaxPrice(Math.round((valueNum - limits.min)/percent));
        onCostChange(values.min, valueNum);
    }
  }

  function onPriceChange(e) {
    const price = Number(e.target.value);
    if (e.target.id === 'left') {
      if (price > maxPrice) {
        setMinPrice(maxPrice);
        setValues({
          ...values,
          min: Math.round(maxPrice * percent) + limits.min
        });
        onCostChange(Math.round(maxPrice * percent) + limits.min, values.max)
      } else {
        setMinPrice(price);
        setValues({
          ...values,
          min: Math.round(price * percent) + limits.min
        });
        onCostChange(Math.round(price * percent) + limits.min, values.max)
      }
    } else {
      if (price < minPrice) {
        setMaxPrice(minPrice);
        setValues({
            ...values,
            max: Math.round(minPrice * percent) + limits.min
        });
        onCostChange(values.min, Math.round(minPrice * percent) + limits.min);
      } else {
        setMaxPrice(price);
        setValues({
          ...values,
          max: Math.round(price * percent) + limits.min
        });
        onCostChange(values.min, Math.round(price * percent) + limits.min);
      }
    }
  }

  function onHideClick() {
    setIsVisible(!isVisible);
  }

  function handleCheckbox(e) {
    const { name, value } = e.target;
    const isChecked = checks.find((item) => item.name === name && item.value === value);
    if (isChecked) {
      /* const filtered = checks.filter((item) => !(item.name === name && item.value === value));
      console.log(filtered, 'aa');
      setChecks(filtered);
      onCharsChange(filtered); */
    } else {
      console.log([...checks, { name, value }]);
      const c = [{name: 'Производитель', values: ['Soool']}];
      const index = c.indexOf(c.find((item) => item.name === name));
      console.log(index);
      if (index !== -1) {
        c[index].values.push(value);
        console.log(c);
      } else {
        c.push({name: name, values: [value]});
      }
      /* setChecks([...checks, { name, value }]);
      onCharsChange([...checks, { name, value }]); */
    }

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
              <input type="text" className="filters__price-input" name='min'
                value={values?.min} placeholder={limits.min} onChange={onPriceInputChange} />
              <input type="text" className="filters__price-input" name='max'
                value={values?.max} placeholder={limits.max} onChange={onPriceInputChange} />
            </div>
            { width >= 768 &&
              <div className="filters__wrapper">
                <div className="filters__container">
                  <div className="filters__slider-track" style={{background: `linear-gradient(to right, #D4D4D4 ${minPrice}%, #98AEEB ${minPrice}%, #98AEEB ${maxPrice}%, #D4D4D4 ${maxPrice}%)`}}></div>
                  <input type="range" min={0} max={100} step="1" className="filters__slider" id='left'
                    value={minPrice} onChange={onPriceChange} />
                  <input type="range" min={0} max={100} step="1" className="filters__slider" id='right'
                    value={maxPrice} onChange={onPriceChange} />
                </div>
              </div>
            }
          </div>
        }
      </fieldset>
      {
        characteristics.map((item) =>
          <fieldset key={item.id} className="filters__field filters__field_type_producer">
            <div className="filters__filter-name">
              <span className="filters__filter-title">{item.name}</span>
              <button className={`filters__hide-btn ${!isVisible ? 'filters__hide-btn_active' : ''}`} type="button" onClick={onHideClick} />
            </div>
            <div className="filters__checks-container">
              <label className="filters__check-name">
                <input type="checkbox" className="filters__check" name={item.name} value={'all'} />
                <span className="filters__pseudo-check" />
                Выбрать все
              </label>
              {
                item.value.map((elem) =>
                  <label className="filters__check-name">
                    <input type="checkbox" className="filters__check" name={item.name} value={elem}
                      checked={checks.find((c) => c.name === item.name && c.value === elem)}  onChange={handleCheckbox} />
                    <span className="filters__pseudo-check" />
                    {elem}
                  </label>
                )
              }

            </div>
          </fieldset>
        )
      }
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

