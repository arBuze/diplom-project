import { useState } from 'react';
import { BASE_IMAGE_URL } from '../../utils/constants';
import './AdminApps.css';

export default function AdminApps({ apps, onRepairStatusChange }) {
  const [appsShown, setAppsShown] = useState([]);
  const [seenShown, setSeenShown] = useState(false);

  useState(() => {
    setAppsShown(apps);
  }, [apps])

  useState(() => {
    let arr = apps;
    if (seenShown) {
      arr = apps.filter((item) => !item.seen);
    }
    setAppsShown(arr);
  }, [seenShown, apps])

  function setSeen() {
    setSeenShown(!seenShown);
  }

  function handleStatusChange(e) {
    const { seen } = apps.find((item) => item._id === e.target.name);
    onRepairStatusChange(seen, e.target.name);
  }

  return(
    <section className="admin-app">
      <div className="admin-app__head-container">
        <h2 className="admin-app__title">Заявки на ремонт</h2>
        <label className="admin-app__check-label">
          Только нерассмотренные заявки
          <input className="admin-app__seen-input" type="checkbox" checked={seenShown} onClick={setSeen} />
        </label>
      </div>
      <ul className="admin-app__app-list">
        {
          appsShown?.map((item) =>{
            const time = [item.createdAt.slice(8,10), item.createdAt.slice(5,7), item.createdAt.slice(0,4)].join('.');
            return (
              <li className="admin-app__app-item">
                <div className="admin-app__item-head">
                  <p className="admin-app__app-title">Заявка №{item._id?.slice(0,5)?.toUpperCase() + item.createdAt?.slice(item.createdAt?.indexOf('.') + 1, item.createdAt?.indexOf('.') + 4)} от {time}</p>
                  <label className="admin-app__seen-label">
                    Отметить как рассмотренную
                    <input className="admin-app__seen-app-input" type="checkbox" checked={item.seen} name={item._id} onClick={handleStatusChange} />
                  </label>
                </div>
                <span className="admin-app__contact">Контакт для связи: {item.contact}</span>
                <span className="admin-app__prob-title">Описание проблемы</span>
                {
                  item.description.split('\n').map((p) =>
                    <p className="admin-app__problem">{p}</p>
                  )
                }
                <ul className="admin-app__img-list">
                  {
                    item?.files?.map((img) =>
                      <li className="admin-app__img-item">
                        <img className='admin-app__image' crossOrigin='true' src={BASE_IMAGE_URL + img} alt='' />
                      </li>
                    )
                  }
                </ul>
              </li>
            )
          })
        }
      </ul>
    </section>
  );
}
