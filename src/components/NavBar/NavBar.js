import './NavBar.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar({ isHidden, email, onLogout }) {
  const location = useLocation();

  return (
    <nav className={`menu ${isHidden ? '' : 'menu_type_visible'}`}>
      {location.pathname === '/signup' && (
        <Link to='/signin' className='menu__link'>
          Войти
        </Link>
      )}
      {location.pathname === '/signin' && (
        <Link to='/signup' className='menu__link'>
          Регистрация
        </Link>
      )}
      {location.pathname === '/main' && (
        <>
          <p className='menu__email'>{email}</p>
          <Link to='/signin' className='menu__link menu__link_color_gray' onClick={onLogout}>
            Выйти
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
