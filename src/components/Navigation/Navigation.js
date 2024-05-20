import './Navigation.css';
import { Link } from 'react-router-dom';

export default function Navigation({ pathname }) {
  return(
    <nav className="menu">
      <ul className={`menu__links ${pathname.includes('admin') ? 'menu__links_admin' : ''}`}>
        { !pathname.includes('admin') ?
          <>
            <li className="menu__link">
              <Link to="/catalog" className="menu__item">Кaталог</Link>
            </li>
            <li className="menul__link">
              <Link to="/repair" className="menu__item">Ремонт</Link>
            </li>
            <li className="menu__link">
              <Link to="/build" className="menu__item">Сборка</Link>
            </li>
            <li className="menu__link">
              <Link to="/sales" className="menu__item">Акции</Link>
            </li>
            {/* <li className="menu__link">
              <Link to="/about-us" className="menu__item">О нас</Link>
            </li> */}
          </>
          :
          <>
            {/* <li className="menu__link">
              <Link to='/admin' className="menu__item">Главная</Link>
            </li> */}
            <li className="menu__link">
              <Link to='/admin/orders' className="menu__item">Заказы</Link>
            </li>
            <li className="menu__link">
              <Link to='/admin/applications' className="menu__item">Заявки</Link>
            </li>
            <li className="menu__link">
              <Link to='/admin/products' className="menu__item">Товары</Link>
            </li>
            <li className="menu__link">
              <Link to='/admin/create-product' className="menu__item">Добавить товар</Link>
            </li>
            <li className="menu__link">
              <Link to='/admin/sales' className="menu__item">Акции</Link>
            </li>
            <li className="menu__link">
              <Link to='/admin/feedbacks' className="menu__item">Отзывы</Link>
            </li>
          </>
        }
      </ul>
    </nav>
  );
};
