import { useState } from 'react';
import './PopupStatus.css';

export default function PopupStatus({ onClose, selectedOrder, onStatusChange }) {
  const [value, setValue] = useState('в сборке');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClick() {
    onStatusChange(value);
  }

  return(
    <div className={`popup popup-status ${selectedOrder ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-btn" onClick={onClose} />
        <div className="popup__select-container">
          <p className="popup__select-name">Изменить статус заказа {selectedOrder?._id?.slice(0,5)?.toUpperCase() + selectedOrder?.createdAt?.slice(selectedOrder?.createdAt?.indexOf('.') + 1, selectedOrder?.createdAt?.indexOf('.') + 4)} на: </p>
          <select className="popup__status-select" name='status'
            value={value} onChange={handleChange}>
            <option className="popup__status">в сборке</option>
            <option className="popup__status">готов к выдаче</option>
            <option className="popup__status">выполнен</option>
          </select>
        </div>
        <button type="button" className="popup__change-btn" onClick={handleClick}>изменить</button>
      </div>
    </div>
  );
}
