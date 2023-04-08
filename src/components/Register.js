import React from "react";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";

function Register({ onRegister }) {
  const { values, onChange, errors, isFormValid } = useValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <input
            className={`form__input auth__input ${
              errors.email ? "form__input_type_error" : ""
            }`}
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            tabIndex="1"
            value={values.email || ""}
            onChange={onChange}
            required
            autoComplete="email"
          />
          <span
            className={`auth__error form__input-error ${
              errors.email ? "form__input-error_active" : ""
            }`}
          >
            {errors.email}
          </span>
          <input
            className={`form__input auth__input ${
              errors.password ? "form__input_type_error" : ""
            }`}
            tabIndex="2"
            placeholder="Пароль"
            type="password"
            name="password"
            id="password"
            value={values.password || ""}
            onChange={onChange}
            minLength="8"
            required
            autoComplete="password"
          />
          <span
            className={`auth__error form__input-error ${
              errors.password ? "form__input-error_active" : ""
            }`}
          >
            {errors.password}
          </span>
          <button
            className={`auth__button ${
              !isFormValid && "form__button-save_disabled"
            }`}
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}

export default Register;
