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
            apps?.map((item) =>{
              const time = [item.createdAt.slice(8,10), item.createdAt.slice(5,7), item.createdAt.slice(0,4)].join('.');
              return(
                <li key={item._id} className="applications__item">
                <p className="applications__title">Заявка №{item._id?.slice(0,5)?.toUpperCase() + item.createdAt?.slice(item.createdAt?.indexOf('.') + 1, item.createdAt?.indexOf('.') + 4)} от {time}</p>
                <Link to={'/profile/applications/' + item._id} className="applications__link">
                  Подробнее
                </Link>
              </li>
              )
            })
          }
        </ul>
      }
    </div>
  );
}
