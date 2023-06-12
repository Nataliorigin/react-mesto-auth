import { handleCheckResponse } from "./utils";
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo = () => {
    //Получить данные о пользователе
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => handleCheckResponse(res));
  };

  getCardList = () => {
    //Получить карточки
    return fetch(`${this._url}cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => handleCheckResponse(res));
  };

  setUserInfo = (data) => {
    //Отправить новые данные пользователя
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => handleCheckResponse(res));
  };

  setCard = (data) => {
    //Отправить новую карточку
    return fetch(`${this._url}cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => handleCheckResponse(res));
  };

  deleteCard = (cardId) => {
    //Удалить карточку
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => handleCheckResponse(res));
  };

  changeLikeCardStatus = (cardId, isLiked) => {
    //Добавить свой лайк в массив лайков
    //Постановка лайка
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => handleCheckResponse(res));
  };

  setUserAvatar = (avatar) => {
    //Отправить новый аватар
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    }).then((res) => handleCheckResponse(res));
  };
}

const api = new Api({
  url: "https://api.nataliorigin.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
