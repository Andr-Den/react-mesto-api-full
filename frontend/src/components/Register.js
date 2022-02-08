import React from 'react'
import Header from './Header.js'
// import InfoTooltip from './InfoTooltip.js';
import { Link } from 'react-router-dom'

function Register({handleSubmit, password, setPassword, email, setEmail}) {

  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [popupDoneOpen, setPopupDoneOpen] = React.useState(false);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="page">
      <Header>
        <Link className="header__link" to="/sign-in">Войти</Link>
      </Header>
      <div className="sign" >
        <form onSubmit={handleSubmit}>
          <fieldset className="sign__container">
            <h2 className="sign__title">Регистрация</h2>
            <input type="email" value={email || ''} placeholder="Email" className="sign__input" onChange={handleEmailChange} />
            <input type="password" value={password || ''}  placeholder="Пароль" className="sign__input" onChange={handlePasswordChange}/>
            <input type="submit" value="Зарегистрироваться" name="submit_button" className="sign__button" />
            <a href="/sign-in" className="sign__link">Уже зарегистрированы? Войти</a>
          </fieldset> 
        </form>
      </div>
    </div>
  )
};

export default Register;