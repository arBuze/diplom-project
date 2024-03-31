import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return(
    <>
      <section className="page-not-found">
        <div className="page-not-found__container">
          <h2 className="page-not-found__title">404</h2>
          <p className="page-not-found__description">Страница не найдена</p>
          <button className="page-not-found__return-btn" type="button" onClick={handleClick}>Назад</button>
        </div>
      </section>
    </>
  );
}
