import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import avatar from "../images/avatar.png";
import DeleteCardPopup from "./DeleteCardPopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import Preloader from "./Preloader";
const JWT_KEY = "jwt";
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    avatar: avatar,
    name: "Загрузка...",
    about: "Загрузка...",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [cardToDelete, setCardToDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "" });
  const navigate = useNavigate();
  const [isRegSuccessful, setIsRegSuccessful] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleInfoTooltip = () => {
    setInfoTooltipOpen(true);
  };

  // Регистрация и Авторизация профиля
  const handleRegisterSignUp = (data) => {
    setIsLoading(!isLoading);
    return auth
      .registerSignUp(data)
      .then(() => {
        setIsRegSuccessful(true);
        setStatusMessage({ message: "Вы успешно зарегистрировались!" });
        handleInfoTooltip();
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsRegSuccessful(false);
        setStatusMessage({
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltip();
      })
      .finally(() => setIsLoading(false));
  };

  const handleAuthorizeSignIn = (data) => {
    setIsLoading(!isLoading);
    return auth
      .authorizeSignIn(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem(JWT_KEY, data.token);
        handleTokenCheck();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setStatusMessage({
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltip();
      })
      .finally(() => setIsLoading(false));
  };

  // Проверка токена
  const handleTokenCheck = () => {
    setIsLoading(!isLoading);
    const jwt = localStorage.getItem(JWT_KEY);
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setUserEmail(data.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/", { replace: true });
    }
  }, [loggedIn]);

  // Выход
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem(JWT_KEY);
    navigate("/sign-in");
  };

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  };
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  const handleCardDelete = (card) => {
    setIsLoading(!isLoading);
    api
      .deleteCard(card._id)
      .then(() => {
        setIsLoading(!isLoading);
        const newCard = cards.filter((item) => item._id !== card._id);
        setCards(newCard);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleDeleteCardClick = (card) => {
    setDeleteCardPopupOpen(!isDeleteCardPopupOpen);
    setCardToDelete(card);
  };
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  };
  const handleUpdateUser = (userData) => {
    setIsLoading(!isLoading);
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(!isLoading);
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };
  const handleAddPlaceSubmit = (card) => {
    setIsLoading(!isLoading);
    api
      .setCard({
        name: card.name,
        link: card.link,
      })
      .then((res) => {
        setIsLoading(!isLoading);
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  if (isLoading) {
    return <Preloader isActive={setIsLoading} />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__body">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-in"
            element={<Login onLogin={handleAuthorizeSignIn} />}
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegisterSignUp} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteCardClick={handleDeleteCardClick}
                handleCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
        </Routes>
        {loggedIn ? <Footer /> : null}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={cardToDelete}
          isLoading={isLoading}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegSuccessful}
          statusMessage={statusMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
