import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <section className="login">
      <Link to='/' className="login__main-link">На главную</Link>
      <div className='login__container'>
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <label className="login__label">
            E-mail или телефон
            <input type="text" className="login__tel-emain-input" />
          </label>\<label className="login__label">
            E-mail или телефон
            <div className="login__input-container">
              <input type="password" className="login__password-input" />
              <button className="login__hide-btn" type="button" />
            </div>
          </label>
        </form>
      </div>
    </section>
  );
}
