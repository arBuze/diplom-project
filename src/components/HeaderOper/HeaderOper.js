'./HeaderOper.css';

import { Link } from "react-router-dom";

export default function HeaderOper() {
  return(
    <header className="header-oper">
      <nav className="header-oper__navigation">
        <ul className="header-oper__links-list">
          <li className="header-oper__item">
            <Link to='/oper' className="header-oper__link">Главная</Link>
          </li>
          <li className="header-oper__item">
            <Link to='/oper/orders' className="header-oper__link">Заказы</Link>
          </li>
          <li className="header-oper__item">
            <Link to='/oper/applications' className="header-oper__link">Заявки</Link>
          </li>
          <li className="header-oper__item">
            <Link to='/oper/products' className="header-oper__link">Товары</Link>
          </li>
          <li className="header-oper__item">
            <Link to='/oper/create-product' className="header-oper__link">Добавить товар</Link>
          </li>
          <li className="header-oper__item">
            <Link to='/oper/create-sale' className="header-oper__link">Добавить акцию</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
