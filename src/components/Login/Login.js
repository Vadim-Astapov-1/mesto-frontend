import './Login.css';
import React, { useEffect, useState } from 'react';

function Login({ onLogin }) {
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

    onLogin(password, email);
  }

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <section className='login'>
      <h2 className='login__title'>Вход</h2>
      <form className='login__form' onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          className='login__input'
          placeholder='Email'
          onChange={handleChange}
          name='email'
          required
        />
        <input
          type='password'
          value={password}
          className='login__input'
          placeholder='Пароль'
          onChange={handleChange}
          name='password'
          required
        />
        <button type='submit' className='login__save-btn'>
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
