import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isLoading, card }) {
  const { isFormValid } = useValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard(card);
  };
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="delete-card"
      title="Вы уверены?"
      textButton={"Да"}
      textLoading={"Удаление..."}
      onLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
