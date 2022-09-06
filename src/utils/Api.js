class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  changeLikeCardStatus(_id, like) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: like ? 'PUT' : 'DELETE',
        credentials: this._credentials,
        headers: this._headers,
      })
      .then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}

export const api = new Api({
  url: 'https://api.va-mesto.ru',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
