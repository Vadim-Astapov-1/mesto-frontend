import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
      onClick={props.onPopupClick}
    >
      <div className='popup__container'>
        <button className='popup__close-button' type='button' onClick={props.onClose}></button>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}PopupForm`}
          onSubmit={props.onSubmit}
        >
          <h2
            className={`popup__title ${
              props.specialLayout ? 'popup__title_place_popup-confirm' : ''
            }`}
          >
            {props.title}
          </h2>
          {props.children}
          <button className='popup__save-button' type='submit'>
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
