import React from 'react'
import Header from './Header.js'
import { Link } from 'react-router-dom'

function Login({handleSubmit, password, setPassword, email, setEmail}) {

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="page">
      <Header>
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </Header>
      <div className="sign" >
        <form onSubmit={handleSubmit}>
          <fieldset className="sign__container">
            <h2 className="sign__title">Вход</h2>
            <input type="email" value={email} placeholder="Email" className="sign__input" onChange={handleEmailChange}/>
            <input type="password" value={password} placeholder="Пароль" className="sign__input" onChange={handlePasswordChange}/>
            <input type="submit" value="Войти" name="submit_button" className="sign__button"/>
          </fieldset> 
        </form>
      </div>
    </div>
)
};

export default Login;