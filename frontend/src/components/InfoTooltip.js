import React from 'react'

function InfoTooltip({ name, title, popupOpen, popupClose}) {

  React.useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') {
        popupClose()
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [popupClose])
  return (
    <div className={`popup ${popupOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container">
          <button className={`popup__icon`} type="button" onClick={popupClose}></button>
          <div className={`tooltip__${name}`}/>
          <h2 className="tooltip__title">{title}</h2>
        </div>
    </div>
  )
}

export default InfoTooltip;