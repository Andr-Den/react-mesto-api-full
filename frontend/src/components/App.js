import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import { api } from '../utils/Api'
import { CurrentUserContext } from '../context/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Routes } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom'
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isProfilePopupOpened, setIsProfilePopupOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser,  setCurrentUser ] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigated = useNavigate()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [popupErrorOpen, setPopupErrorOpen] = React.useState(false);
  const [popupDoneOpen, setPopupDoneOpen] = React.useState(false);

  function popupDoneClose() {
    setPopupDoneOpen(false)
  }

  function popupErrorClose() {
    setPopupErrorOpen(false)
  }

  function  handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true) 
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpened(true) 
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true) 
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsProfilePopupOpened(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  function handlePopupClick(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups()
    }
  }

  function handleUpdateUser(info) {
    api.editUserInfo(info.name, info.about)
    .then((result) => {
      setCurrentUser(result.data)
    }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(info) {
    api.editAvatar(info.avatar)
    .then((result) => {
      setCurrentUser(result.data)
    }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn){
      auth.userEmail(token).then((res) => {
        if (res) {
          setUserEmail(res.data.email)
          setLoggedIn(true)
          navigated("/")
        }
      })
      .catch((err) => console.log(err));
    }
    Promise.all([api.fetchUserInfo(), api.getInitialCards()])
    .then(([resultUserInfo, resultCardList]) => {
      setCurrentUser(resultUserInfo.data);
      setCards(resultCardList.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [loggedIn, navigated])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
  })
  .catch((err) => {
    console.log(err);
  })
  }

  function handleAddPlace(newCard) {
    api.createCard(newCard.name, newCard.link)
    .then((newCard) => {
      setCards([newCard.data, ...cards]); 
    }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  function signOut(){
    localStorage.removeItem('token');
    navigated('/sign-in');
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    auth.authorize(password, email).then((data) => {
      if (data?.token) {
        setUserEmail(email)
        setLoggedIn(true)
        navigated('/');
      }
    })
    .catch((err) => {
      console.log(err);
      setPopupErrorOpen(true)
    });
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
      auth.register(password, email).then((res) => {
          setPopupDoneOpen(true)
      })
      .catch((err) => {
        setPopupErrorOpen(true)
        console.log(err);
      });
  }

  const Component = () => {
    return (
      <div className="page"> 
            <CurrentUserContext.Provider value={currentUser}>
              <Header linkName="Выйти" linkDirection="/sign-in">
                <div className="header__title">
                  <p className="header__email">{userEmail}</p>
                  <button className="header__link header__link_login" onClick={signOut}>Выйти</button>
                </div>
              </Header>
              <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
              <Footer />
              <EditProfilePopup isOpen={isProfilePopupOpened} onClose={closeAllPopups} onPopupClick={handlePopupClick}  onUpdateUser={handleUpdateUser}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPopupClick={handlePopupClick} onAddPlace={handleAddPlace}></AddPlacePopup>
              <PopupWithForm title="Вы уверены?" name="confirm" onClose={closeAllPopups} onPopupClick={handlePopupClick} buttonText="Да" />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onPopupClick={handlePopupClick} onUpdateAvatar={handleUpdateAvatar}/>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} onPopupClick={handlePopupClick}/>
            </CurrentUserContext.Provider>
          </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute path="/" loggedIn={loggedIn} component={Component}/>
      }/>
      <Route path="/sign-up" element={
        <>
        <Register 
          handleSubmit={handleRegisterSubmit}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
        />
        <InfoTooltip popupOpen={popupErrorOpen} popupClose={popupErrorClose} name="image-error" title="Что-то пошло не так! Попробуйте ещё раз."/>
        <InfoTooltip name="image-done" title="Вы успешно зарегистрировались!" popupOpen={popupDoneOpen} popupClose={popupDoneClose}/>
        </>
      } />
      <Route path="/sign-in" element={
        <>
          <Login 
            handleSubmit={handleLoginSubmit}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
          />
          <InfoTooltip popupOpen={popupErrorOpen} popupClose={popupErrorClose} name="image-error" title="Что-то пошло не так! Попробуйте ещё раз."/>
        </>
      } />
    </Routes>
  );
}

export default App;
