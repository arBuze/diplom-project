import { useState } from 'react';
import '../Login/Login.css';
import useFormValidation from '../../hooks/useFormValidation';
import { apir } from '../../utils/OperApi';
import { ERROR_CODES, ERROR_TEXTS } from '../../utils/constants';

export default function AdminLogin({ onAuth }) {
  const { values, handleChange, isValid } = useFormValidation();
  const [errors, setErrors] = useState({});
  const [shown, setShown] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { login, password } = values;

    if (!login || !password) {
      return;
    }

    apir.authorize({ login, password })
      .then((admin) => {
        onAuth(admin);
      })
      .catch((err) => {
        const errorText = err === ERROR_CODES.conflict ? ERROR_TEXTS.sameLoginError : ERROR_TEXTS.authError;
        setErrors({
          ...errors,
          signin: errorText,
        });
      });
  }

  function show() {
    setShown(!shown);
  }

  return(
    <section className="login">
      <div className='login__container'>
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <label className="login__label">
            Логин
            <input type="text" className="login__input login__input_type_tel-email" name='login'
              value={values?.login} onChange={handleChange} />
          </label>
          <span className="login__input-error">{errors?.login}</span>
          <label className="login__label">
            Пароль
            <div className="login__input-container">
              <input type={shown ? "text" : "password"} className="login__input login__input_type_password" name='password'
                value={values?.password} onChange={handleChange} />
              <button className={`login__hide-btn ${shown ? 'unhidden' : ''}`} type="button" onClick={show} />
            </div>
          </label>
          <span className="login__input-error">{errors?.password}</span>

          <span className="login__auth-error">{errors?.signin}</span>
          <button className="login__auth-btn" type="submit" disabled={!isValid}>войти</button>
        </form>
      </div>
    </section>
  );
}
