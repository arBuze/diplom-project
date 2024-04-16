import { useEffect, useState } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import Filters from '../Filters/Filters';
import ProductsList from '../ProductsList/ProductsList';
import './ComputerCases.css';

export default function ComputerCases({ name, cards, width, scroll, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove }) {
  const [displayType, setDisplaytype] = useState('grid');
  const [isReversed, setIsReversed] = useState(false);
  const [shownCards, setShowCards] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [priceFilter, setPriceFilter] = useState(null);
  const [checks, setChecks] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(false);

  const limits = cards.reduce(({min, max}, item) => {
    if (min > item.productCost) {
      min = item.productCost;
    }
    if (max < item.productCost) {
      max = item.productCost;
    }
    return({ min, max });
  }, { min: cards[0].productCost, max: cards[0].productCost });

  /* достаем фильтры из локального хранилища */
  useEffect(() => {
    const filters = JSON.parse(localStorage.getItem('filter'));
    if (filters && filters.path.includes(pathname)) {
      if (filters.price) {
        setPriceFilter(filters.price);
      }
      if (filters.chars && filters.chars.length !== 0) {
        setChecks(filters.chars);
      }
      if (filters.rating) {
        setRatingFilter(filters.rating);
      }
    } else {
      localStorage.removeItem('filter');
    }
  }, [])

  /* задает список характеристик */
  useEffect(() => {
    /* сделать сортировку характеристик по возрастанию */
    setShowCards(cards);
    const arr = [];
    cards.forEach((card) =>
      card.characteristics.forEach((item) => {
        const el = arr.find((elem) => elem.name === item.name);
        if (el) {
          arr[el.id].value.indexOf(item.value) === -1 && arr[el.id].value.push(item.value);
        } else {
          arr.push({
            id: arr.length,
            name: item.name,
            value: [item.value]
          });
        }
      })
    );
    setCharacteristics(arr);
  }, [cards])

  useEffect(() => {
    if (scroll > 0) {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  }, [])

  /* фильтр карточек */
  useEffect(() => {
    let filteredCards = cards;

    if (priceFilter !== null) {
      console.log('111', filteredCards);
      filteredCards = filteredCards.filter((item) => item.productCost >= priceFilter.min && item.productCost <= priceFilter.max);
    }
    if (checks && checks.length !== 0) {
      console.log('222', filteredCards);
      filteredCards = filterChars(filteredCards);
    }
    if (ratingFilter) {
      filteredCards = filteredCards.filter((item) => item.rating >= 4);
    }

    localStorage.setItem('filter', JSON.stringify({
      path: pathname,
      price: priceFilter,
      chars: checks,
      rating: ratingFilter
    }));
    
    setShowCards(filteredCards);
  }, [priceFilter, checks, ratingFilter, cards])

  function onViewChange(e) {
    setDisplaytype(e.target.name);
  }

  function onReverseBtnClick() {
    setIsReversed(!isReversed);
    setShowCards(shownCards.slice().reverse());
  }

  function filterChars(cardsArray) {
    let filtered = cardsArray.filter((item) => {
      const arr = [];
      checks.forEach((par) => {
        const temp = item.characteristics.find((char) => char.name === par.name && par.values.includes(char.value));
        if (temp) {
          arr.push(temp);
        }
      });
      return (arr.length === checks.length);
    });

    return filtered;
  }

  function handlePriceFilterChange(minCost, maxCost) {
    const minPrice = minCost ? minCost : limits.min;
    const maxPrice = maxCost ? maxCost : limits.max;
    setPriceFilter({
      min: minPrice,
      max: maxPrice,
    });
  }

  function handleRatingCheckClick() {
    setRatingFilter(!ratingFilter);
  }

  function handleCharsChange(e) {
    console.log('fbvwegfhiWJE');
    const { name, value } = e.target;
    console.log(e.target);
    const isChecked = checks.find((item) => item.name === name && item.values.includes(value));

    if (isChecked) {
      const temp = isChecked.values;
      temp.splice(temp.indexOf(value), 1);
      if (temp.length === 0) {
        setChecks(checks.filter((item) => !(item.name === name)));
      } else {
        setChecks(state => state.map((item) => item.name === name ? { name: name, values: temp } : item));
      }
    } else {
      const index = checks.find((item) => item.name === name);
      if (index) {
        setChecks(state => state.map((item) => item.name === name ? { name: index.name, values: [...index.values, value] } : item))
      } else {
        setChecks([
          ...checks,
          {
            name: name,
            values: [value]
          }
        ]);
      }
    }
  }

  function handleAllCheckClick(e) {
    const { name } = e.target;
    const { value } = characteristics.find((item) => item.name === name);
    const isChecked = checks.find((item) => item.name === name);

    console.log('is', isChecked);
    if (isChecked) {
      if (isChecked.values.length === value.length) {
        setChecks(checks.filter((item) => !(item.name === name)));
      } else {
        setChecks(state => state.map((item) => item.name === name ? { name: name, values: [...value] } : item));
      }
    } else {
      setChecks([
        ...checks,
        {
          name: name,
          values: [...value]
        }
      ]);
    }
  }

  return(
    <section className="computer-cases">
      <h2 className="computer-cases__title">{name}</h2>
      <Breadcrumps />
      <div className="computer-cases__container">
        { width >= 1024 &&
          <Filters width={width} limits={limits} checks={checks}
            characteristics={characteristics} pathname={pathname}
            onCostChange={handlePriceFilterChange} onCharsChange={handleCharsChange}
            onAllClick={handleAllCheckClick} onRatingClick={handleRatingCheckClick} />
        }
        <div className="computer-cases__list-container">
          <div className="computer-cases__filters-container">
            <div className="computer-cases__add-container">
              { width < 1024 && <button className="computer-cases__filter-btn" type="button" /> }
              <select className="computer-cases__filter-select">
                <option className="computer-cases__filter-option">По умолчанию</option>
                <option className="computer-cases__filter-option">По цене</option>
                <option className="computer-cases__filter-option">По рейтингу</option>
                <option className="computer-cases__filter-option">По скидке</option>
              </select>
              <button className={`computer-cases__reverse-btn ${isReversed ? 'computer-cases__reverse-btn_active' : ''}`} type="button"
                onClick={onReverseBtnClick} />
            </div>
            <div className="computer-cases__add-container">
              <label className="computer-cases__view-container">
                <input className="computer-cases__view-btn" id="grid-btn" name="grid" type="radio" checked={displayType === 'grid'}
                  onChange={onViewChange} />
                <span className="computer-cases__pseudo-view" />
              </label>
              <label className="computer-cases__view-container">
                <input className="computer-cases__view-btn" id="list-btn" name="list" type="radio" checked={displayType === 'list'}
                  onChange={onViewChange} />
                <span className="computer-cases__pseudo-view" />
              </label>
            </div>
          </div>
          <ProductsList cards={shownCards}
            width={width} display={displayType}
            isReversed={isReversed} pathname={pathname}
            faves={faves} cart={cart}
            onLike={onLike} onDislike={onDislike}
            onCartAdd={onCartAdd} onCartRemove={onCartRemove} />
        </div>
      </div>
    </section>
  );
};
