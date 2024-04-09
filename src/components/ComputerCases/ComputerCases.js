import { useEffect, useState } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import Filters from '../Filters/Filters';
import ProductsList from '../ProductsList/ProductsList';
import './ComputerCases.css';

export default function ComputerCases({ name, cards, width, scroll, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove }) {
  const [displayType, setDisplaytype] = useState('grid');
  const [isReversed, setIsReversed] = useState(false);
  const [shownCards, setShowCards] = useState([]);
  const [filters, setFilters] = useState({});
  const [characteristics, setCharacteristics] = useState([]);

  const limits = cards.reduce(({min, max}, item) => {
    if (min > item.productCost) {
      min = item.productCost;
    }
    if (max < item.productCost) {
      max = item.productCost;
    }
    return({ min, max });
  }, { min: cards[0].productCost, max: cards[0].productCost });

  useEffect(() => {
    let fils = JSON.parse(localStorage.getItem('filter'));
    if (fils) {
      if (fils.path.includes(pathname)) {
        setFilters(fils);
      } else {
        localStorage.removeItem('filter');
      }
    }
  }, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (scroll > 0) {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  }, [])

  function onViewChange(e) {
    setDisplaytype(e.target.name);
  }

  function onReverseBtnClick() {
    setIsReversed(!isReversed);
    setShowCards(shownCards.slice().reverse());
  }

  function filterPrice(parameters) {
    const { min, max } = parameters;
    let filtered = cards.filter((item) => item.productCost >= min && item.productCost <= max);

    return filtered;
  }

  function filterChars(parameters, cards) {
    let filtered = cards.filter((item) => {
      const arr = [];
      parameters.forEach((par) => {
        item.characteristics.find((char) => char.name === par.name && char.value === par.value)
    })
    }
    );

    return filtered;
  }

  function handleFilter(type, chars) {
    let filteredCards = cards;
    if (type) {
      if (type === 'price') {
        filteredCards = filterPrice(chars);
        if (filters.chars && filters.chars.length !== 0) {
          filteredCards = filterChars(filters.chars, filteredCards);
        }
      } else {
        if (filters.price) {
          filteredCards = filterPrice(filters.price);
        }
        if (chars.length !== 0)
          filteredCards = filterChars(chars, filteredCards);
      }
    } else {
      if (filters.price) {
        filteredCards = filterPrice(filters.price);
      }
      if (filters.chars && filters.chars.length !== 0) {
        filteredCards = filterChars(filters.chars, filteredCards);
      }
    }
    setShowCards(filteredCards);
  }

  function handlePriceFilterChange(minCost, maxCost) {
    const minPrice = minCost ? minCost : limits.min;
    const maxPrice = maxCost ? maxCost : limits.max;
    setFilters({
      ...filters,
      price: {
        min: minPrice,
        max: maxPrice,
      }
    });
    localStorage.setItem('filter', JSON.stringify({
      path: pathname,
      pars: {
        ...filters,
        price: {
          min: minPrice,
          max: maxPrice,
        }
      }
    }));
    handleFilter('price', {
      min: minPrice,
      max: maxPrice,
    });
  }

  function handleCharsChange(array) {
      setFilters({
        ...filters,
        chars: array
      });
      localStorage.setItem('filter', JSON.stringify({
        path: pathname,
        pars: {
          ...filters,
          chars: array
        }
      }));
    handleFilter('chars', array);
  }

  return(
    <section className="computer-cases">
      <h2 className="computer-cases__title">{name}</h2>
      <Breadcrumps />
      <div className="computer-cases__container">
        { width >= 1024 &&
          <Filters width={width} limits={limits}
            characteristics={characteristics} pathname={pathname}
            onCostChange={handlePriceFilterChange} onCharsChange={handleCharsChange} />
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
