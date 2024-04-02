import './UserData.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContexts';
import useFormValidation from '../../hooks/useFormValidation';
import { useContext, useEffect, useState } from 'react';
import { NAME_REG, EMAIL_REG, PHONE_REG } from '../../utils/constants';

export default function UserData({ isEdit, isLoading, onEditClick, onDataUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid } = useFormValidation();
  const [isSameData, setIsSameData] = useState(false);

  useEffect(() => {
    setValues({
      phone: currentUser.phone,
      email: currentUser.email,
      name: currentUser.name,
      lastName: currentUser.lastName
    });
  }, [currentUser])

  function handleEditCLick() {
    onEditClick();
  }

  function handleInputChange(e) {
    handleChange(e);
    /* const { name, value } = e.target; */
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { phone, email, name, lastName } = values;

    if (!phone && !email) {
      return;
    }

    /* сабмит значений */
    onDataUpdate(phone, email, name, lastName);
  }

  return(
    <form className="user-data" onSubmit={handleSubmit}>
      <label className="user-data__initials">
        <span className="user-data__label">
          Номер телефона <span className="user-data__required-input">*</span>
        </span>
        <input type="tel" className="user-data__input" name='phone' id='phone-input'
          disabled={!isEdit} value={values.phone ? values.phone : ''} onChange={handleInputChange} />
      </label>
      <span className="user-data__input-error">{errors?.phone}</span>
      <label className="user-data__initials">
        <span className="user-data__label">
          E-mail <span className="user-data__required-input">*</span>
        </span>
        <input type="email" className="user-data__input" name='email' id='email-input'
          disabled={!isEdit} value={values.email ? values.email : ''} onChange={handleInputChange}
          pattern={EMAIL_REG} />
      </label>
      <span className="user-data__input-error">{errors?.email}</span>
      <label className="user-data__initials">
        Имя
        <input type="text" className="user-data__input" name='name' id='name-input'
          disabled={!isEdit} value={values.name ? values.name : ''} onChange={handleInputChange}
          pattern={NAME_REG} />
      </label>
      <span className="user-data__input-error">{errors?.name}</span>
      <label className="user-data__initials">
        Фамилия
        <input type="text" className="user-data__input" name='lastName' id='lastName-input'
          disabled={!isEdit} value={values.lastName ? values.lastName : ''} onChange={handleInputChange}
          pattern={NAME_REG} />
      </label>
      <span className="user-data__input-error">{errors?.lastName}</span>
      <button type="button" className="user-data__change-password-btn">Сменить пароль</button>
      <div className="user-data__btn-container">
      {
        isEdit ? <button type="submit" className="user-data__save-btn"
          disabled={!isValid || isLoading || isSameData} >
            Сохранить
        </button>
        : <button type="button" className="user-data__change-btn" onClick={handleEditCLick}>Редактировать</button>
      }
        <button type="button" className="user-data__delete-btn">Удалить профиль</button>
      </div>
    </form>
  );
}

