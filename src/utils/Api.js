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

  /* создание пользователя */
  createUser(email, phone, password) {
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
  }

  /* получение данных пользователя */
  getUserData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        ...this._headers,
      },
    })
      .then(res => this._getResponseData(res));
  }

  /* изменение данных пользователя */
  updateUserData() {

  }

  changeFavorite(cardId, isLiked) {
    return fetch(`${this._baseUrl}/users/me/favorite/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PATCH',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  addToCart(card) {
    const { id, category, image, productName, productCost } = card; /* позже будет images[0] */
    return fetch(`${this._baseUrl}/users/me/cart`, {
      method: 'PATCH',
      headers: this._headers,
      body: {
        productId: id,
        category,
        image: image,
        productName,
        productCost,
        quantity: 1,
      }
    })
      .then(res => this._getResponseData(res));
  }

  changeProductQuantity(cardId, newQuantity) {
    return fetch(`${this._baseUrl}/users/me/cart/${cardId}`, {
      method: 'PATCH',
      headers: this._headers,
      body: { newQuantity }
    })
      .then(res => this._getResponseData(res));
  }

  deleteFromCart(cardId) {
    return fetch(`${this._baseUrl}/users/me/cart/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  clearCart() {
    return fetch(`${this._baseUrl}/users/me/cart`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  /* получение товаров пользователя */
  getUserOrders(token) {
    return fetch(`${this._baseUrl}/orders`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        ...this._headers,
      },
    })
      .then(res => this._getResponseData(res));
  }

  createOrder(isGuest, cart, token) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        ...this._headers,
      },
      body: {
        isGuest,
        products: cart,
        status: 'в сборке',
      }
    })
      .then(res => this._getResponseData(res));
  }

  createApplication(description, contact, fileNames, isGuest, token) {
    return fetch(`${this._baseUrl}/repair`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        ...this._headers,
      },
      body: JSON.stringify({
        description,
        contact,
        isGuest,
        fileNames,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  addApplicationPhoto(form) {
    return fetch(`${this._baseUrl}/repair/images`, {
      method: 'POST',
      body: form,
    })
      .then(res => this._getResponseData(res));
  }

  deleteApplicationPhoto(fileName) {
    return fetch(`${this._baseUrl}/repair/images`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ fileName }),
    })
      .then(res => this._getResponseData(res));
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});
