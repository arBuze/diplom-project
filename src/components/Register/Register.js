import useFormValidation from '../../hooks/useFormValidation';
import { auth } from '../../utils/AuthApi';
import { ERROR_CODES, ERROR_TEXTS } from '../../utils/constants';
import '../Login/Login.css';
import './Register.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmail, isMobilePhone } from 'validator';

export default function Register({ onAuth, navigate }) {
  const [checked, setChecked] = useState(false);
  const { values, handleChange } = useFormValidation();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleInputChange(e) {
    handleChange(e);
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
    setIsValid(true);

    if (e.target.value === '') {
      setErrors({
        ...errors,
        [e.target.name]: 'Поле не может быть пустым',
      });
    } else if (e.target.name === 'login') {
      const isValidInput = isEmail(e.target.value) || isMobilePhone(e.target.value, ['ru-RU']);
      if (!isValidInput) {
        setIsValid(false);
        setErrors({
          ...errors,
          [e.target.name]: 'E-mail или телефон указан неверно',
        });
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(values);
    if (!values.login || !values.password) {
      return;
    }

    const { login, password } = values;

    if (isEmail(login)) {
      auth.register({email: login, password})
        .then((res) => {
          return auth.authorize({email: login, password})
        })
        .then((user) => {
          onAuth(user);
          navigate('/');
        })
        .catch((err) => {
          const errorText = err === ERROR_CODES.conflict ? ERROR_TEXTS.sameLoginError : ERROR_TEXTS.registerError;
          setErrors({
            ...errors,
            register: errorText,
          });
        });
    } else {
      const number = login.includes('+7') ? login.slice(2,) : login.slice(1,);
      auth.register({phone: number, password})
        .then((res) => {
          return auth.authorize({phone: number, password})
        })
        .then((data) => {
          onAuth(data);
          navigate('/');
        })
        .catch((err) => {
          const errorText = err === ERROR_CODES.conflict ? ERROR_TEXTS.sameLoginError : ERROR_TEXTS.registerError;
          setErrors({
            ...errors,
            register: errorText,
          });
        });
    }
  }

  function handleCheck() {
    setChecked(!checked);
  }

  return(
    <section className="login">
      <Link to='/' className="login__main-link">&#8701; На главную</Link>
      <div className='login__container'>
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <label className="login__label">
            E-mail или телефон
            <input type="text" className="login__input login__input_type_tel-email" name='login' minLength={1}
              value={values?.login} onChange={handleInputChange} />
          </label>
          <span className="login__input-error">{errors?.login}</span>
          <label className="login__label">
            Пароль
            <div className="login__input-container">
              <input type="password" className="login__input login__input_type_password" name='password' minLength={1}
                value={values?.password} onChange={handleInputChange} />
              <button className="login__hide-btn" type="button" />
            </div>
          </label>
          <span className="login__input-error">{errors?.password}</span>
          <label className="register__check-label">
            <input type="checkbox" className="register__check" checked={checked} onChange={handleCheck} />
            Я согласен(-на) на обработку персональных данных
          </label>
          <span className="login__auth-error">{errors?.register}</span>
          <button className="login__auth-btn" type="submit" disabled={!isValid || !checked}>Зарегистрироваться</button>
          <p className="login__question">
            Уже зарегистрированы? <Link to='/signin' className="login__link">Войти</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
