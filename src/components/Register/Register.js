import '../Login/Login.css';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <section className="login">
      <Link to='/' className="login__main-link">&#8701; На главную</Link>
      <div className='login__container'>
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <label className="login__label">
            E-mail или телефон
            <input type="text" className="login__input login__input_type_tel-email" />
          </label>
          <span className="login__input-error">error error error error errorerro rerrorer rorerror error error error error error </span>
          <label className="login__label">
            Пароль
            <div className="login__input-container">
              <input type="password" className="login__input login__input_type_password" />
              <button className="login__hide-btn" type="button" />
            </div>
          </label>
          <span className="login__input-error">error error error error error error error error error error error error error error</span>

          <span className="login__auth-error">error</span>
          <button className="login__auth-btn" type="submit">Зарегистрироваться</button>
          <p className="login__question">
            Уже зарегистрированы? <Link to='/signin' className="login__link">Войти</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
