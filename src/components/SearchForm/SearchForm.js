import './SearchForm.css';

export default function SearchForm({ additional }) {
  return(
    <form className={`search-form ${additional}`}>
      <input className="search-form__input" type="text" name="search" placeholder="Поиск..." />
      <button className="search-form__button" type="submit"></button>
    </form>
  );
};
