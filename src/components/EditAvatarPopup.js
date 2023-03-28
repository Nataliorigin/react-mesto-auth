import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";
import useValidation from "../hooks/useValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {
    values,
    errors,
    onChange,
    resetValidation,
    isFormValid,
    setIsFormValid,
  } = useValidation();
  useEffect(() => {
    resetValidation();
    setIsFormValid(false);
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name={"edit-avatar"}
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={isLoading}
      isValid={isFormValid}
    >
      <label className="form__field">
        <input
          value={values.avatar || ""}
          onChange={onChange}
          className={`form__input form__input_name_linkAvatar ${
            errors.avatar ? "form__input_type_error" : ""
          } `}
          tabIndex="3"
          placeholder="Ссылка на картинку"
          type="url"
          name="avatar"
          required
        />
        <span
          className={`avatar-error form__input-error ${
            errors.avatar ? "form__input-error_active" : ""
          }`}
        >
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
