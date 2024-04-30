import Filters from '../Filters/Filters';
import ProductsList from '../ProductsList/ProductsList';
import './SearchResults.css';

export default function SearchResults({ cards }) {
  return(
    <section className="search-results">
      <h2 className="search-results__title">Найдено {cards.length} товар{[11, 12, 13, 14].indexOf((item.products.length - 4) % 100) !== -1 ? 'ов' : (item.products.length - 4) % 10 === 1 ? '' : [2, 3, 4].indexOf((item.products.length - 4) % 10) !== -1 ? 'а' : 'ов'}</h2>
      <div className="search-results__container">
        <Filters />
        <ProductsList cards />
      </div>
    </section>
  );
};
