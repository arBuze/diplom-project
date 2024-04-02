import { useEffect, useState } from 'react';
import Breadcrumps from '../Breadcrumps/Breadcrumps';
import Filters from '../Filters/Filters';
import ProductsList from '../ProductsList/ProductsList';
import './ComputerCases.css';

export default function ComputerCases({ name, cards, width, scroll, pathname, onLike, onCartAdd, faves, cart, onDislike, onCartRemove }) {
  const [displayType, setDisplaytype] = useState('grid');
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    if (scroll > 0) {
      window.scrollTo({
        top: 0,
        left: 0
      });
    }
  },[])

  function onViewChange(e) {
    setDisplaytype(e.target.name);
  }

  function onReverseBtnClick() {
    setIsReversed(!isReversed);
  }

  return(
    <section className="computer-cases">
      <h2 className="computer-cases__title">{name}</h2>
      <Breadcrumps />
      <div className="computer-cases__container">
        { width >= 1024 && <Filters width={width} /> }
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
          <ProductsList cards={isReversed ? cards.slice().reverse() : cards}
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
