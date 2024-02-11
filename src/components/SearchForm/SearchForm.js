import './SearchForm.css';

export default function SearchForm({ classForHeader }) {
  return(
    <form className={`search-form ${classForHeader}`}>
      <input className="search-form__input" type="text" name="search" placeholder="Поиск..." />
      <button className="search-form__button" type="submit"></button>
    </form>
  );
};
