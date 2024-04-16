class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  createApplication(description, contact, fileNames) {
    return fetch(`${this._baseUrl}/repair`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        description,
        contact,
        fileNames,
      }),
    })
      .then(res => this._getResponseData(res));
  }

  addApplicationPhoto(form) {
    return fetch(`${this._baseUrl}/images`, {
      method: 'POST',
      body: form,
    })
      .then(res => this._getResponseData(res));
  }

  deleteApplicationPhoto(fileName) {
    return fetch(`${this._baseUrl}/iamges`, {
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
