import useValidation from "../hooks/useValidation";

function Login({ onLogin }) {
  const { values, onChange, errors, isFormValid } = useValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          className={`form__input auth__input ${
            errors.email ? "form__input_type_error" : ""
          }`}
          placeholder="Email"
          type="email"
          name="email"
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
          placeholder="Пароль"
          type="password"
          name="password"
          tabIndex="2"
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
