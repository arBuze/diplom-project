import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <section className="login">
      <Link to='/' className="login__main-link">&#8701; На главную</Link>
      <div className='login__container'>
        <h2 className="login__title">Вход</h2>
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
          <div className="login__other">
            <label className="login__remember-label">
              <input type="checkbox" className="login__remember-check" />
              Запомнить меня
            </label>
            <button type="button" className="login__forgot-btn">Забыли пароль</button>
          </div>
          <span className="login__input-error">error error error error error error error error error error error error error error</span>

          <span className="login__auth-error">error</span>
          <button className="login__auth-btn" type="submit">войти</button>
          <p className="login__question">
            Нет аккаунта? <Link to='/signup' className="login__link">Зарегистрируйтесь</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
