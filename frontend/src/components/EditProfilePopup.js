import React from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../context/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onPopupClick, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
    onClose()
  } 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpened={isOpen} onClose={onClose} onPopupClick={onPopupClick} onSubmit={handleSubmit} buttonText="Сохранить">
      <input type="text" value={name || ''} onChange={handleNameChange} placeholder="Ваше имя" id="input-name" className="popup__input" name="input-name" minLength="2" maxLength="40" required />
      <span className="popup__input-error input-name-error"></span>
      <input type="text" value={description || ''} onChange={handleDescriptionChange} placeholder="Род занятий" id="input-job" className="popup__input" name="input-job" minLength="2" maxLength="200" required />
    </PopupWithForm>
  )
}

export default EditProfilePopup;