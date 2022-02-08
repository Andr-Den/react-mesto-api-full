class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  fetchUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse); 
  }

  createCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
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
      headers: this._headers,
    })
    .then(this._checkResponse); 
  }

  changeLikeCardStatus(id, liked) {
    return fetch(this._baseUrl + '/cards/likes/' + id, {
      method: !liked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: 'a9ff0c53-5bfa-4560-ac1a-cab5954bddf5',
    'Content-Type': 'application/json'
  }
});
