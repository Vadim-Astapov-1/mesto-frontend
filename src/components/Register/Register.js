import './Register.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(evt) {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister(password, email);
  }

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <section className='register'>
      <h2 className='register__title'>Регистрация</h2>
      <form className='register__form' onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          className='register__input'
          placeholder='Email'
          onChange={handleChange}
          name='email'
          required
        />
        <input
          type='password'
          value={password}
          className='register__input'
          placeholder='Пароль'
          onChange={handleChange}
          name='password'
          required
        />
        <button type='submit' className='register__save-btn'>
          Зарегистрироваться
        </button>
      </form>
      <Link to='/signin' className='register__login-link'>
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
