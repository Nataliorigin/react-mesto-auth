import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ card, onCardClick, onCardLike, onDeleteCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `item__like-button ${
    isLiked && "item__like-button_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onDeleteCardClick(card);
  }
  return (
    <li className="item">
      {isOwn && (
        <button
          className="item__delete"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        onClick={handleClick}
        className="item__image"
        src={card.link}
        alt={card.name}
      />
      <div className="item__container">
        <h2 className="item__title">{card.name}</h2>
        <div className="item__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="item__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
