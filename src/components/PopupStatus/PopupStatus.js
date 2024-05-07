import './PopupStatus.css';

export default function PopupStatus({ isOpen, onClose }) {
  return(
    <div className={`popup popup-status ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" onClick={onClose} />
        <div className="popup__select-container">
          <p className="popup__select-name">Изменить статус на: </p>
          <select className="popup__status-select" name='status'>
            <option className="popup__status">В сборке</option>
            <option className="popup__status">Готов к выдаче</option>
            <option className="popup__status">Выполнен</option>
          </select>
        </div>
        <button type="button" className="popup__change-btn">изменить</button>
      </div>
    </div>
  );
}
