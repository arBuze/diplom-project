class AuthApi {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /* преобразование ответа */
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  /* создание пользователя */
  register({ email, phone, password, isGuest }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        phone,
        password,
        isGuest
      }),
    })
      .then(res => this._getResponseData(res));
  }

  /* авторизация пользователя */
  authorize({ email, phone, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        phone,
        password,
      }),
    })
      .then(res => this._getResponseData(res))
      .then((data) => {
        if (data) {
          return data;
        }
      });
  }

  /* выход из профиля */
  exit() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  deleteProfile() {
    return fetch(`${this._baseUrl}/user/me`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  /* проверка токена */
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => this._getResponseData(res));
  }
}

export const auth = new AuthApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});
