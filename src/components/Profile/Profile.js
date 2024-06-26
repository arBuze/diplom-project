import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import Breadcrumps from '../Breadcrumps/Breadcrumps';


export default function Profile({ children, title, pathname, onSignOut }) {
  const navigate = useNavigate();

  function handleExitBtnClick() {
    navigate('/signin');
  }

  return(
    <section className="profile">
      <h2 className="profile__title">{title}</h2>
      <Breadcrumps productName={'Заказ' } /> {/* + pathname.slice(pathname.lastIndexOf('/') + 1,) */}
      <div className="profile__container">
        <div className="profile__links-container">
          <ul className="profile__links">
            <li className="profile__item">
              <NavLink exact to='/profile' className={`profile__link ${pathname === '/profile' ? 'profile__link_active' : ''}`}>
                Личные данные
              </NavLink>
            </li>
            <li className="profile__item">
              <NavLink to='/profile/orders' className={({ isActive }) => `profile__link ${isActive ? 'profile__link_active' : ''}`}>
                Заказы
              </NavLink>
            </li>
            <li className="profile__item">
              <NavLink to='/profile/applications' className={({ isActive }) => `profile__link ${isActive ? 'profile__link_active' : ''}`}>
                Заявки на ремонт
              </NavLink>
            </li>
            <li className="profile__item">
              <Link to='/cart' className="profile__link">Корзина</Link>
            </li>
            <li className="profile__item">
              <Link to='/favorite' className="profile__link">Избранное</Link>
            </li>
          </ul>
          <button type="button" className="profile__exit-btn" onClick={onSignOut}>Выйти из аккаунта</button>
        </div>
        <div className="profile__info-container">
          {children}
        </div>
      </div>
    </section>
  );
}

