import React, { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onPopupClick }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleChange(evt) {
    if (evt.target.name === 'name') {
      setCardName(evt.target.value);
    } else {
      setCardLink(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onPopupClick={onPopupClick}
    >
      <input
        type='text'
        value={cardName}
        onChange={handleChange}
        placeholder='Название'
        className='popup__input popup__input_type_place-name'
        id='place-name-input'
        name='name'
        minLength='2'
        maxLength='30'
        required
      />
      <span className='popup__input-error' id='place-name-input-error'></span>
      <input
        type='url'
        value={cardLink}
        onChange={handleChange}
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_type_place-link'
        id='place-link-input'
        name='link'
        required
      />
      <span className='popup__input-error' id='place-link-input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
