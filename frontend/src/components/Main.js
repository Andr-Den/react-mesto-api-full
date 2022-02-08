import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../context/CurrentUserContext'

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__space">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button className="profile__overlay"  onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p></div>
      </div>
      <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
    </section>
    <section className="elements">
      <ul className="elements__list">
      {cards?.map((card) => (
        <Card card={card} onClick={onCardClick} onCardLike={onCardLike} key={card._id} onCardDelete={onCardDelete}/>
      ))}
      </ul>
    </section>
  </main>
  
  )
};

export default Main;
