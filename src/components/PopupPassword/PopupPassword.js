import './PopupPassword.css';
import useFormValidation from '../../hooks/useFormValidation';
import { useState } from 'react';
import { api } from '../../utils/Api';

export default function PopupPassword({ isOpened, onClose }) {
  const { values, handleChange, isValid, resetForm } = useFormValidation();
  const [error, setError] = useState('');

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { oldPas, newPas } = values;

    if (!oldPas || !newPas) {
      return;
    }

    api.updateUserPassword(oldPas, newPas)
      .then(() => {
        onClose();
        resetForm();
      })
      .catch((err) => {
        setError(err);
      });
  }

  return(
    <div className={`popup popup-pas ${isOpened ? 'popup_opened' : ''}`}>
      <div className="popup-repair__container popup-pas__container">
        <button type="button" className="popup-repair__close-btn" onClick={handleClose} />
        <form className="popup-pas__form" name="password" onSubmit={handleSubmit} >
          <label className="popup-pas__label">
            Старый пароль
            <input className="popup-pas__input" type="text" name='oldPas'
              value={values?.oldPas} onChange={handleChange} minLength={0} />
          </label>
          <label className="popup-pas__label">
            Новый пароль
            <input className="popup-pas__input" type="text" name="newPas"
              value={values?.newPas} onChange={handleChange} minLength={0} />
          </label>
          <span className="popup-pas__error">{error}</span>
          <button className="popup-pas__submit-btn" type="submit" disabled={!isValid}>изменить</button>
        </form>
      </div>
    </div>
  );
}
