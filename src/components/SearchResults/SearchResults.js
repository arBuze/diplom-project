import ProductsList from '../ProductsList/ProductsList';
import './SearchResults.css';

export default function SearchResults({ cards }) {
  return(
    <section className="search-results">
      <h2 className="search-results__title">Найдено {cards.length}товар{}</h2>
      <div className="search-results__container">
        <ProductsList cards />
      </div>
    </section>
  );
};
