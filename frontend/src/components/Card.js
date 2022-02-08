import React from 'react'
import cap from '../images/cap.svg'
import basket from '../images/basket.svg'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Card({card, onClick, onCardLike, onCardDelete}) {

const currentUser = React.useContext(CurrentUserContext);

const isOwn = card.owner._id === currentUser._id;
const cardDeleteButtonClassName = (
  `card__button ${isOwn ? '' : 'card__button_hidden'}`
); 

const isLiked = card.likes.some(i => i._id === currentUser._id);
const cardLikeButtonClassName =  (
  `card__like ${isLiked ? 'card__like_active' : ''}`
); ; 

  function handleClick() {
    onClick(card)
  }  

  function handleLikeClick() {
    onCardLike(card)
  }  

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
  <li className="card">
    <div className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
      <img src={cap} alt="#"/>
      <img src={basket} alt="#"/>
    </div>
    <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
    <div className="card__description">
      <h2 className="card__text">{card.name}</h2>
      <div>
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <p className="card__like-amount">{card.likes.length}</p>
      </div>
    </div>
  </li>
)}

export default Card;
