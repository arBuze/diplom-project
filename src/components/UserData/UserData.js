import './UserData.css';

export default function UserData() {
  return(
    <form className="user-data">
      <label className="user-data__initials">
        <span className="user-data__label">
          Номер телефона <span className="user-data__required-input">*</span>
        </span>
        <input type="tel" className="user-data__input" />
      </label>
      <span className="user-data__input-error">error error error errorerror erro </span>
      <label className="user-data__initials">
        <span className="user-data__label">
          E-mail <span className="user-data__required-input">*</span>
        </span>
        <input type="email" className="user-data__input" />
      </label>
      <span className="user-data__input-error">error error error errorerror erro </span>
      <label className="user-data__initials">
        Имя
        <input type="text" className="user-data__input" />
      </label>
      <span className="user-data__input-error">error error error errorerror erro </span>
      <label className="user-data__initials">
        Фамилия
        <input type="text" className="user-data__input" />
      </label>
      <span className="user-data__input-error">error error error errorerror erro </span>
      <button type="button" className="user-data__change-password-btn">Сменить пароль</button>
      <div className="user-data__btn-container">
        <button type="button" className="user-data__change-btn">Редактировать</button>
        <button type="button" className="user-data__delete-btn">Удалить профиль</button>
      </div>
    </form>
  );
}

