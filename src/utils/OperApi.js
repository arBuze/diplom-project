class OperApi {
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

  /* добавление нового товара */
  createProduct(name, description, price, category, chars, images) {
    return fetch(`${this._baseUrl}/products`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name,
        category,
        images,
        characteristics: chars,
        price,
        description,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  /* изменение товара */
  updateProduct(id, name, description, price, category, chars, images) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        name,
        category,
        images,
        characteristics: chars,
        price,
        description,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  deleteProduct(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }

  /* добавление фото к товару */
  addProductPhoto(form) {
    return fetch(`${this._baseUrl}/products/images`, {
      method: 'POST',
      body: form,
    })
      .then(res => this._getResponseData(res));
  }

  /* удаление фото */
  deleteProductPhoto(fileName) {
    return fetch(`${this._baseUrl}/products/images`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({ fileName }),
    })
      .then(res => this._getResponseData(res));
  }
}

export const apir = new OperApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});

