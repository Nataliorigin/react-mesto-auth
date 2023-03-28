import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";
import useValidation from "../hooks/useValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    onChange,
    resetValidation,
    isFormValid,
    setIsFormValid,
  } = useValidation();
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    resetValidation(currentUser);
    setIsFormValid(true);
  }, [currentUser, isOpen]);
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
    resetValidation();
  };
  return (
    <PopupWithForm
      name={"edit-profile"}
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={isLoading}
      isValid={isFormValid}
    >
      <label className="form__field">
        <input
          value={values.name || ""}
          onChange={onChange}
          className={`form__input form__input_name_username ${
            errors.name ? "form__input_type_error" : ""
          }`}
          tabIndex="1"
          placeholder="Имя"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          className={`name-error form__input-error ${
            errors.name ? "form__input-error_active" : ""
          }`}
        >
          {errors.name || ""}
        </span>
      </label>
      <label className="form__field">
        <input
          value={values.about || ""}
          onChange={onChange}
          className={`form__input form__input_name_activity ${
            errors.about ? "form__input_type_error" : ""
          }`}
          tabIndex="2"
          placeholder="О себе"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className={`about - error form__input-error ${
            errors.about ? "form__input-error_active" : ""
          }`}
        >
          {errors.about || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
