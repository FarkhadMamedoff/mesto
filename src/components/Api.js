export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}: ${res.statusText}`);
  }

  _getData(request) {
    return fetch(this._baseUrl + request, {
      headers: this._headers,
    })
      .then((res) => { return this._getResult(res) });
  }

  _setData(request, method, object) {
    return fetch(this._baseUrl + request, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(object),
    })
      .then((res) => { return this._getResult(res) });
  }

  _updateData(request, method, id) {
    return fetch(this._baseUrl + request + id, {
      method: method,
      headers: this._headers,
    })
      .then((res) => { return this._getResult(res) });
  }

  getInitialCards() {
    return this._getData('/cards');
  }

  getUserInfo() {
    return this._getData('/users/me');
  }

  updateUserAvatar(object) {
    return this._setData('/users/me/avatar', 'PATCH', object);
  }

  updateUserInfo(object) {
    return this._setData('/users/me', 'PATCH', object);
  }

  addNewCard(object) {
    return this._setData('/cards', 'POST', object);
  }

  deleteCard(cardId) {
    return this._updateData('/cards/', 'DELETE', cardId);
  }

  likeCard(cardId) {
    const request = cardId + '/likes';
    return this._updateData('/cards/', 'PUT', request);
  }

  dislikeCard(cardId) {
    const request = cardId + '/likes';
    return this._updateData('/cards/', 'DELETE', request);
  }
}