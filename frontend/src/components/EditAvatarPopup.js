import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onPopupClick, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    onClose()
  }

  return (
    <PopupWithForm title="Обновить аватар" name="update-avatar" isOpened={isOpen} onClose={onClose} onPopupClick={onPopupClick}  onSubmit={handleSubmit} buttonText="Сохранить">
      <input type="url" ref={avatarRef} placeholder="Ссылка на картинку" id="input-avatar" className="popup__input" name="input-avatar" required />
      <span className="popup__input-error input-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
