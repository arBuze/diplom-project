import { Link } from 'react-router-dom';
import phone from '../../images/phone-call.svg';
import mail from '../../images/envelope.svg';
import './Footer.css';

export default function Footer() {
  return(
    <footer className="footer">
      <div className="footer__info-container">
        <ul className="footer__main-links">
          <li className="footer__links-item">
            <Link to="/catalog" className="footer__main-link">Каталог</Link>
          </li>
          <li className="footer__links-item">
            <Link to="/catalog" className="footer__main-link">Ремонт</Link>
          </li>
          <li className="footer__links-item">
            <Link to="/catalog" className="footer__main-link">Акции</Link>
          </li>
        </ul>
        <div className="footer__information">
          <h3 className="footer__information-title">Компания</h3>
          <ul className="footer__information-links">
            <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">О нас</Link>
            </li>
            <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">Контакты</Link>
            </li>
            <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">Вакансии</Link>
            </li>
          </ul>
        </div>
        <div className="footer__information">
          <h3 className="footer__information-title">Информация</h3>
          <ul className="footer__information-links">
          <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">Способы и условия оплаты</Link>
            </li>
            <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">Политика</Link>
            </li>
            <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">Реквизиты</Link>
            </li>
            <li className="footer__information-item">
              <Link to="/about-us" className="footer__information-link">Контакты</Link>
            </li>
          </ul>
        </div>
        <div className="footer__other-info">
          <Link to="/" className="footer__feedback-link">Обратная связь</Link>
          <div className="footer__contacts">
            <div className="footer__phone-number">
              <img className="footer__phone-icon" src={phone} />
              <p className="footer__number">+ 7 (999) 545-23-43 (с 9:00 до 20:00)</p>
            </div>
            <div className="footer__email">
              <img className="footer__email-icon" src={mail} />
              <p className="footer__email-addr">sergeev022@mail.ru</p>
            </div>
            <div className="footer__address">
              <h4 className="footer__address-title">Офисы:</h4>
              <ul className="footer__address-list">
                <li className="footer__address-info">г. Серпухов, ул. Советская, д. 32</li>
                <li className="footer__address-info">г. Серпухов, ул. Советская, д. 32</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__copyright-container">
        <p className="footer__copyright">
          <span className="footer__copyright-year">&copy;2024</span> &mdash; Разработано самостоятельно
        </p>
      </div>
    </footer>
  );
};
