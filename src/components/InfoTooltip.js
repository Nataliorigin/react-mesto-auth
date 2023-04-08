import checkMarkSuccess from "../images/image-success.svg";
import crossMarkUnSuccess from "../images/image-unsuccess.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, statusMessage }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          src={isSuccess ? checkMarkSuccess : crossMarkUnSuccess}
          alt={
            isSuccess ? "Регистрация прошла успешно" : "Регистрация не прошла"
          }
          className="popup__signup-image"
        />
        <h2 className="popup__signup-title">{statusMessage.message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
