class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleCheckResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo = () => {
    //Получить данные о пользователе
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  getCardList = () => {
    //Получить карточки
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  setUserInfo = (data) => {
    //Отправить новые данные пользователя
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleCheckResponse(res));
  };

  setCard = (data) => {
    //Отправить новую карточку
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleCheckResponse(res));
  };

  deleteCard = (cardId) => {
    //Удалить карточку
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    //Добавить свой лайк в массив лайков
    //Постановка лайка
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._handleCheckResponse(res));
  };

  setUserAvatar = (avatar) => {
    //Отправить новый аватар
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then((res) => this._handleCheckResponse(res));
  };
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-59/",
  headers: {
    authorization: "7e9bec29-0c4a-4040-905f-685af73cf60c",
    "Content-Type": "application/json",
  },
});

export default api;
