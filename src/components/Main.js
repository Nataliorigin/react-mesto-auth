import avatar from "../images/avatar.png";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onAddPlaceClick,
  onEditProfileClick,
  onEditAvatarClick,
  onCardClick,
  handleCardLike,
  onDeleteCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <img
            className="profile__avatar"
            src={currentUser.avatar || avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfileClick}
              className="profile__edit-button"
              type="button"
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlaceClick}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="cards" aria-label="Изображения">
        <ul className="cards__container">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onDeleteCardClick={onDeleteCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
