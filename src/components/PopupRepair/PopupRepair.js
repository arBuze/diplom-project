import './PopupRepair.css';
import success from '../../images/success.svg';
import { Link } from 'react-router-dom';

export default function PopupRepair({ isOpened, onClose }) {

  function handleClose() {
    onClose();
  }

  return(
    <div className={`popup popup-repair ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup-repair__container">
        {/* <button type="button" className="popup-repair__close-btn" onClick={onClose} /> */}
        <figure className="popup-repair__img-container">
          <img className="popup-repair__success-img" src={success} alt='Успех' />
          <figcaption className="popup-repair__success-title">Успешно!</figcaption>
        </figure>
        <p className="popup-repair__next-paragraph">
          Что делать дальше?
        </p>
        <p className="popup-repair__description">
          Подождите, пока с вами свяжется специалист по указанному контакту.
          Он скажет свои предположения насчет вашей проблемы и примерную цену за услугу.
        </p>
        <p className="popup-repair__description">
          Если вас все устраивает, он подскажет адрес, куда можно подъехать и сдать технику на ремонт.
        </p>
        <Link to="/" className="popup-repair__link" onClick={handleClose}>На главную</Link>
      </div>
    </div>
  );
}
