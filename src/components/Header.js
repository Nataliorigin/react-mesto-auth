import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";
import { useCallback, useState } from "react";
function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logo}
          alt="Логотип сервиса 'Место'"
          className="header__logo"
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                {" "}
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                {" "}
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <div className="header__auth">
                  <p className="header__email">{userEmail}</p>
                  <button
                    className="header__button-sign-out"
                    onClick={() => onSignOut()}
                  >
                    Выйти
                  </button>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
