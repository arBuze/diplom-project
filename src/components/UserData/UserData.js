import './UserData.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContexts';
import useFormValidation from '../../hooks/useFormValidation';
import { useContext, useEffect, useState } from 'react';
import { NAME_REG, EMAIL_REG, PHONE_REG, phoneTransform, LASTNAME_REG } from '../../utils/constants';

export default function UserData({ isEdit, isLoading, onEditClick, onDataUpdate, onPasswordChangeClick }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, setErrors, handleChange } = useFormValidation();
  const [isFormValid, setIsFormValid] = useState(false);
  /* const [isSameData, setIsSameData] = useState(false); */

  useEffect(() => {
    const { phone, email, name, lastName } = currentUser;
    setValues({
      email,
      name,
      lastName,
    });
    if (phone) {
      const number = '+7 ' + phone.slice(0,3) + '' + phone.slice(3,6) + '-' + phone.slice(6,8) + '-' + phone.slice(8,);
      setValues({
        ...values,
        phone: number,
      });
    }
  }, [currentUser])

  useEffect(() => {
    if (errors.phone || errors.email || errors.name || errors.lastName || (!values.phone && !values.email)) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [values, errors])

  function handleFocus(e) {
    if (e.target.value === '') {
      setValues({
        ...values,
        phone: '+7 ',
      });
    }
  }

  function handleSetErrors(name, value) {
    setErrors({
      ...errors,
      [name]: value,
    });
  }

function handleSetValues(name, value) {
  setValues({
    ...values,
    [name]: value,
  });
}

  function handleInputChange(e) {
    const { name, value } = e.target;

    handleSetErrors(name, '');
    switch (name) {
      case 'phone':
        const num = phoneTransform(value, values.phone)
        handleSetValues(name, num);
        if (!PHONE_REG.test(num)) {
          handleSetErrors(name, 'Введите данные в формате: +7 900 000-00-00');
        }
        if (value === '') {
          handleSetErrors(name, 'Поле не может быть пустым');
        }
        break;
      case 'name':
        handleSetValues(name, value);
        if (value > 30) {
          handleSetErrors(name, 'Максимальное количество символов: 30');
        }
        if (!NAME_REG.test(value) && value !== '') {
          handleSetErrors(name, 'Поле может содержать только буквы, тире и нижнее подчеркивание');
        }
        break;
      case 'lastName':
        handleSetValues(name, value);
        if (value > 60) {
          handleSetErrors(name, 'Максимальное количество символов: 60');
        }
        if (!LASTNAME_REG.test(value) && value !== '') {
          handleSetErrors(name, 'Поле может содержать только буквы, тире и нижнее подчеркивание');
        }
        break;
      case 'email':
        handleChange(e);
        break;
      default:
        return;
    }
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
          minLength='10' maxLength='16'
          disabled={!isEdit} value={values.phone ? values.phone : ''}
          onChange={handleInputChange} onFocus={handleFocus} />
      </label>
      <span className="user-data__input-error">{errors?.phone}</span>
      <label className="user-data__initials">
        <span className="user-data__label">
          E-mail <span className="user-data__required-input">*</span>
        </span>
        <input type="email" className="user-data__input" name='email' id='email-input'
          disabled={!isEdit} value={values.email ? values.email : ''}
          onChange={handleInputChange}
          pattern={EMAIL_REG} required />
      </label>
      <span className="user-data__input-error">{errors?.email}</span>
      <label className="user-data__initials">
        Имя
        <input type="text" className="user-data__input" name='name' id='name-input'
          disabled={!isEdit} value={values.name ? values.name : ''}
          onChange={handleInputChange} />
      </label>
      <span className="user-data__input-error">{errors?.name}</span>
      <label className="user-data__initials">
        Фамилия
        <input type="text" className="user-data__input" name='lastName' id='lastName-input'
          disabled={!isEdit} value={values.lastName ? values.lastName : ''}
          onChange={handleInputChange} />
      </label>
      <span className="user-data__input-error">{errors?.lastName}</span>
      <button type="button" className="user-data__change-password-btn" onClick={onPasswordChangeClick}>
        Сменить пароль
      </button>
      <div className="user-data__btn-container">
      {
        isEdit ? <button type="submit" className="user-data__save-btn"
          disabled={!isFormValid || isLoading /* || isSameData */}
          /* onClick={} */ >
            Сохранить
        </button>
        : <button type="button" className="user-data__change-btn" onClick={onEditClick}>Редактировать</button>
      }
        <button type="button" className="user-data__delete-btn">Удалить профиль</button>
      </div>
    </form>
  );
}

