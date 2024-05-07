class Api {
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

  /* получение товаров */
  getProducts() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

  /* создание пользователя */
 /*  createUser(email, phone, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: {
        email,
        phone,
        password,
      },
    })
      .then(res => this._getResponseData(res));
  } */

  /* получение данных пользователя */
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  /* изменение данных пользователя */
  updateUserData(email, phone, name, lastName) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        phone,
        name,
        lastName,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  /* изменение пароля */
  updateUserPassword(oldPas, newPas) {
    return fetch(`${this._baseUrl}/users/me/pas`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        oldPas,
        newPas,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  /* удаление профиля */
  deleteProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  /* изменение избранных товаров */
  changeFavorite(cardId, isLiked) {
    return fetch(`${this._baseUrl}/users/me/favorite/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PATCH',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  /* добавление в корзину */
  addToCart(card) {
    const { id, category, image, productName, productCost } = card; /* позже будет images[0] */
    return fetch(`${this._baseUrl}/users/me/cart`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        productId: id,
        category,
        image: image,
        productName,
        productCost,
        quantity: 1,
      })
    })
      .then(res => this._getResponseData(res));
  }

  /* изменение количества товара */
  changeProductQuantity(cardId, newQuantity) {
    return fetch(`${this._baseUrl}/users/me/cart/${cardId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ newQuantity }),
    })
      .then(res => this._getResponseData(res));
  }

  /* удаление товара из корзины */
  deleteFromCart(cardId) {
    return fetch(`${this._baseUrl}/users/me/cart/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  /* очистка корзины */
  clearCart() {
    return fetch(`${this._baseUrl}/users/me/cart`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  /* получение товаров пользователя */
  getUserOrders() {
    return fetch(`${this._baseUrl}/orders`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  /* создание заказа */
  createOrder(cart, phone, email, isGuest) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        isGuest,
        products: cart,
        contacts: {
          phone,
          email,
        },
        status: 'в сборке',
      }),
    })
      .then(res => this._getResponseData(res));
  }

  /* получение заявок пользвателя */
  getUserApplications() {
    return fetch(`${this._baseUrl}/repair/me`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  /* создание заявки */
  createApplication(description, contact, fileNames/* , isGuest */) {
    return fetch(`${this._baseUrl}/repair`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        description,
        contact,
        /* isGuest, */
        fileNames,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  /* добавление фото к заявке */
  addApplicationPhoto(form) {
    return fetch(`${this._baseUrl}/repair/images`, {
      method: 'POST',
      body: form,
    })
      .then(res => this._getResponseData(res));
  }

  /* удаление фото */
  deleteApplicationPhoto(fileName) {
    return fetch(`${this._baseUrl}/repair/images`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ fileName }),
    })
      .then(res => this._getResponseData(res));
  }

  /* получение всех акций */
  getSales() {
    return fetch(`${this._baseUrl}/sales`, {
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res))
      .catch((err) => {
        console.log(err);
      });
  }

}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});
