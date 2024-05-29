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

  authorize({ login, password }) {
    return fetch(`${this._baseUrl}/admin/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        if (data) {
          console.log(data);
          localStorage.setItem('adminId', data.admin._id);
          return data;
        }
      });
  }

  checkToken() {
    return fetch(`${this._baseUrl}/admin/me`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  getAdminData() {
    return fetch(`${this._baseUrl}/admin/me`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  getOrders() {
    return fetch(`${this._baseUrl}/orders`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  getApplications() {
    return fetch(`${this._baseUrl}/repair`, {
      credentials: 'include',
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  /* добавление нового товара */
  createProduct(name, description, price, category, chars, images, articule, quantity) {
    return fetch(`${this._baseUrl}/products`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        category,
        images,
        characteristics: chars,
        price,
        description,
        articule,
        quantity,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  /* изменение товара */
  updateProduct(id, name, description, price, category, chars, images, articule, quantity) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        category,
        images,
        characteristics: chars,
        price,
        description,
        articule,
        quantity,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  updateProductRating(id, rating) {
    return fetch(`${this._baseUrl}/products/${id}/rating`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        rating,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  deleteProduct(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
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

  updateOrderStatus(status, orderId) {
    return fetch(`${this._baseUrl}/orders/${orderId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        status,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  updateRepairStatus(status, repairId) {
    return fetch(`${this._baseUrl}/repair/${repairId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        status,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  updateFeedbackStatus(feedbackId) {
    return fetch(`${this._baseUrl}/feedbacks/${feedbackId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res));
  }

  deleteFeedback(feedbackId) {
    return fetch(`${this._baseUrl}/feedbacks/${feedbackId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
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

