import './SearchForm.css';
 import useFormValidation from '../../hooks/useFormValidation';
import { useEffect } from 'react';

export default function SearchForm({ additional, onSearch, pathname }) {
  const { values, setValues, errors, handleChange, isValid } = useFormValidation();

  useEffect(() => {
    if (pathname === '/search') {
      const searchValue = localStorage.getItem('founds');
      if (searchValue) {
        setValues({
          ...values,
          search: searchValue,
        });
      }
    } else {
      setValues({
        ...values,
        search: '',
      });
    }
  }, [pathname])

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.search || values.search === '') {
      return;
    }

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
