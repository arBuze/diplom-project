import './Applications.css';

export default function Applications({ apps }) {
  return(
    <div className="applications">
      {
        apps.length === 0 ?
        <div className="applications__void">
          <p className="applications__void-text">Вы еще не подвали ни одной заявки</p>
        </div>
        :
        <ul className="applications__list">
          {
            apps.map((item) =>
              <li key={item.id} className="applications__item">
                
              </li>
            )
          }
        </ul>
      }
    </div>
  );
}
