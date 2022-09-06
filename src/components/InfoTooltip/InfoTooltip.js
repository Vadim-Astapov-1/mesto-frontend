import React from 'react';
import successIcon from '../../images/success-icon.svg';
import errorIcon from '../../images/error-icon.svg';

function InfoTooltip({ status, isOpen, onClose, onPopupClick }) {
  return (
    <div
      className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}
      onClick={onPopupClick}
    >
      <div className='popup__container'>
        <button className='popup__close-button' type='button' onClick={onClose}></button>
        <img className='popup__icon' src={status ? successIcon : errorIcon} alt='Иконка' />
        <h2 className='popup__title popup__title_place_popup-tooltip'>
          {status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
