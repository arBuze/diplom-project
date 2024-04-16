import { Link } from 'react-router-dom';
import './Applications.css';

export default function Applications({ apps }) {
  return(
    <div className="applications">
      {
        apps.length === 0 ?
        <div className="applications__void">
          <p className="applications__void-text">Вы еще не подавали ни одной заявки</p>
        </div>
        :
        <ul className="applications__list">
          {
            apps.map((item) =>
              <li key={item.id} className="applications__item">
                <p className="applications__title">Заявка № 1233 от 13.09.2024</p>
                <Link to={'/profile/applications/' + 123123} className="applications__link">
                  Подробнее
                </Link>
              </li>
            )
          }
        </ul>
      }
    </div>
  );
}
