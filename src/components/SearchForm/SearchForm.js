import './SearchForm.css';
 import useFormValidation from '../../hooks/useFormValidation';

export default function SearchForm({ additional, onSearch }) {
  const { values, setValues, errors, handleChange, isValid } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(values.search);
  }

  return(
    <form className={`search-form ${additional}`} onSubmit={handleSubmit}>
      <input className="search-form__input" type="text" name="search" placeholder="Поиск..."
        minLength="1" value={values.search ? values.search : ''} onChange={handleChange} />
      <button className="search-form__button" type="submit" disabled={!isValid}></button>
    </form>
  );
};
