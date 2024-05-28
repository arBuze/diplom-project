import { useState } from 'react';
import './Applications.css';
import '../AdminApps/AdminApps.css';
import { BASE_IMAGE_URL } from '../../utils/constants';

export default function Applications({ apps }) {
  const [opened, setOpened] = useState([]);

  function handleOpen(e) {
    const { name } = e.target;
    const isOpen = opened.find((item) => item === name);
    if (isOpen) {
      setOpened(opened.filter((item) => !(item === name)));
    } else {
      setOpened([...opened, name]);
    }
  }

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
                <button className="applications__link" type="button" name={item._id} onClick={handleOpen}>
                  { opened.find((id) => id === item._id) ? 'Скрыть' : 'Подробнее' }
                </button>
                {
                  opened.find((id) => id === item._id) &&
                  <div className='app__desc-container'>
                    <p className="app__status">Статус: { item?.seen ? 'просмотрено' : 'в ожидании' }</p>
                    <p className="app__desc-title">Описание: </p>
                    {
                      item.description.split('\n').map((text) =>
                        <p className="app__description">{text}</p>
                      )
                    }
                    <span className="app__contact">Контакт: {item.contact}</span>
                    <ul className="admin-app__img-list">
                      {
                        item?.files?.map((img) =>
                          <li className="admin-app__img-item" key={img}>
                            <img className='admin-app__image' crossOrigin='true' src={BASE_IMAGE_URL + img} alt='' />
                          </li>
                        )
                      }
                    </ul>
                  </div>
                }
              </li>
              )
            })
          }
        </ul>
      }
    </div>
  );
}
