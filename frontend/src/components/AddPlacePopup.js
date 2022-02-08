import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onPopupClick, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
    onClose()
  } 
  return (
<PopupWithForm title="Новое место" name="add-card" isOpened={isOpen} onClose={onClose} onPopupClick={onPopupClick} onSubmit={handleSubmit} buttonText="Создать">
        <input type="text" value={name || ''} onChange={handleNameChange} placeholder="Название" id="input-card-name" className="popup__input" name="input_card_name" minLength="2" maxLength="30" required />
        <span className="popup__input-error input-card-name-error"></span>
        <input type="url" value={link || ''} onChange={handleLinkChange} placeholder="Ссылка на картинку" id="input-link" className="popup__input" name="input_link" required />
        <span className="popup__input-error input-link-error"></span>
      </PopupWithForm>
  )
}

export default AddPlacePopup;
