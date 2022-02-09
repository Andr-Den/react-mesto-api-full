class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _headersWithToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this._headers.Authorization = `Bearer ${token}`
    }
    return this._headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headersWithToken()
    })
    .then(this._checkResponse);
  }

  fetchUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headersWithToken()
    })
    .then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headersWithToken(),
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse); 
  }

  editAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headersWithToken(),
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse); 
  }

  createCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headersWithToken(),
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse); 
  }

  deleteCard(id) {
    return fetch(this._baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this._headersWithToken(),
    })
    .then(this._checkResponse); 
  }

  changeLikeCardStatus(id, liked) {
    return fetch(this._baseUrl + '/cards/' + id + '/likes', {
      method: !liked ? 'PUT' : 'DELETE',
      headers: this._headersWithToken(),
    })
    .then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'http://api.telcontar2012.nomoredomains.xyz',
  headers: {'Content-Type': 'application/json'}
});
