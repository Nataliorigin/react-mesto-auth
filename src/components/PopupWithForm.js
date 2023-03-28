function PopupWithForm({
  title,
  name,
  textButton,
  isOpen,
  onClose,
  children,
  onSubmit,
  onLoading,
  textLoading,
  isValid,
}) {
  return (
    <section
      className={isOpen ? "popup popup_opened" : `popup popup_content_${name}`}
      aria-label={`popup popup_content_${name}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={"popup__container"}>
        <button
          className={"popup__button-close"}
          type={"button"}
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        <h2 className={"popup__title"}>{title}</h2>
        <form
          action="#"
          className={"popup_form form"}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`form__button-save ${
              !isValid && "form__button-save_disabled"
            }`}
            type={"submit"}
          >
            {onLoading
              ? textLoading || "Сохранение..."
              : textButton || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
