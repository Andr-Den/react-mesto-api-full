import React from 'react'
function PopupWithForm({ name, title, isOpened, onClose, onPopupClick, onSubmit, buttonText, children}) {

  React.useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])
  return (
    <div className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`} onClick={onPopupClick} >
        <div className="popup__container">
          <button className={`popup__icon popup__icon_${name}`} type="button" onClick={onClose}></button>
          <form className={`popup__form popup__form_${name}`} name={`edit_${name}_form`} onSubmit={onSubmit} noValidate>
            <fieldset className="popup__set">
              <h2 className="popup__title">{title}</h2>
              {children}
              <input type="submit" className="popup__submit-button" value={buttonText}/>
            </fieldset> 
          </form>
        </div>
    </div>
  )
}

export default PopupWithForm;