import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useValidation from "../hooks/useValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };
  return (
    <PopupWithForm
      name={"add-card"}
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      textButton={"Создать"}
      textLoading={"Создание..."}
      onSubmit={handleSubmit}
      onLoading={isLoading}
      isValid={isFormValid}
    >
      <label className="form__field">
        <input
          value={values.name || ""}
          onChange={onChange}
          className={`form__input form__input_name_title ${
            errors.name ? "form__input_type_error" : ""
          } `}
          tabIndex="1"
          placeholder="Название"
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`name-error form__input-error ${
            errors.name ? "form__input-error_active" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>
      <label className="form__field">
        <input
          value={values.link || ""}
          onChange={onChange}
          className={`form__input form__input_name_link ${
            errors.link ? "form__input_type_error" : ""
          }`}
          tabIndex="2"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          required
        />
        <span
          className={`link-error form__input-error ${
            errors.link ? "form__input-error_active" : ""
          }`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
