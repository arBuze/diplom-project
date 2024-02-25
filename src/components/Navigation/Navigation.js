import './Navigation.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return(
    <nav className="menu">
      <ul className="menu__links">
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
          <Link to="/sale" className="menu__item">Акции</Link>
        </li>
        <li className="menu__link">
          <Link to="/about-us" className="menu__item">О нас</Link>
        </li>
      </ul>
    </nav>
  );
};
