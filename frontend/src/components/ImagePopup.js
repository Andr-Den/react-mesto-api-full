import React from 'react'

function ImagePopup({card, onClose, onPopupClick}) {
  if (!card) return null
  return (
    <div className={`popup popup_type_open-cards ${card ? 'popup_opened' : ''}`} onClick={onPopupClick}>
      <div className="popup__figure">
        <button className="popup__icon popup__icon_open-cards" type="button" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <div className="popup__figcaption">{card.name}</div>
      </div>
    </div> 
  )
}

export default ImagePopup;