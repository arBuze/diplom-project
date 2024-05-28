import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { isEmail, isMobilePhone } from 'validator';
import { auth } from '../../utils/AuthApi';
import { ERROR_CODES, ERROR_TEXTS } from '../../utils/constants';

export default function Login({ onAuth, navigate }) {
  const { values, handleChange } = useFormValidation();
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [shown, setShown] = useState(false);

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

  function show() {
    setShown(!shown);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('123');
    if (!values.login || !values.password) {
      return;
    }

    const { login, password } = values;

    if (isEmail(login)) {
      auth.authorize({email: login, password})
        .then((user) => {
          onAuth(user);
          navigate('/');
        })
        .catch((err) => {
          const errorText = err === ERROR_CODES.conflict ? ERROR_TEXTS.sameLoginError : ERROR_TEXTS.authError;
          setErrors({
            ...errors,
            signin: errorText,
          });
        });
    } else {
      console.log('12345');
      const number = login.includes('+7') ? login.slice(2,) : login.slice(1,);
      auth.authorize({phone: number, password})
        .then((data) => {
          onAuth(data);
          navigate('/');
        })
        .catch((err) => {
          const errorText = err === ERROR_CODES.conflict ? ERROR_TEXTS.sameLoginError : ERROR_TEXTS.authError;
          setErrors({
            ...errors,
            signin: errorText,
          });
        });
    }
  }

  return(
    <section className="login">
      <Link to='/' className="login__main-link">&#8701; На главную</Link>
      <div className='login__container'>
        <h2 className="login__title">Вход</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <label className="login__label">
            E-mail или телефон
            <input type="text" className="login__input login__input_type_tel-email" name='login'
              value={values?.login} onChange={handleInputChange} />
          </label>
          <span className="login__input-error">{errors?.login}</span>
          <label className="login__label">
            Пароль
            <div className="login__input-container">
              <input type={shown ? "text" : "password"} className="login__input login__input_type_password" name='password'
                value={values?.password} onChange={handleInputChange} />
              <button className={`login__hide-btn ${shown ? 'unhidden' : ''}`} type="button" onClick={show} />
            </div>
          </label>
          <div className="login__other">
            {/* <label className="login__remember-label">
              <input type="checkbox" className="login__remember-check" />
              Запомнить меня
            </label> */}
            <button type="button" className="login__forgot-btn">Забыли пароль</button>
          </div>
          <span className="login__input-error">{errors?.password}</span>

          <span className="login__auth-error">{errors?.signin}</span>
          <button className="login__auth-btn" type="submit" disabled={!isValid}>войти</button>
          <p className="login__question">
            Нет аккаунта? <Link to='/signup' className="login__link">Зарегистрируйтесь</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
