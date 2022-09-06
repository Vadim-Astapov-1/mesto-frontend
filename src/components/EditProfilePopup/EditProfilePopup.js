import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onPopupClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(evt) {
    if (evt.target.name === 'name') {
      setName(evt.target.value);
    } else {
      setDescription(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onPopupClick={onPopupClick}
    >
      <input
        type='text'
        value={name}
        onChange={handleChange}
        placeholder='Имя'
        className='popup__input popup__input_type_name'
        id='name-input'
        name='name'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='popup__input-error' id='name-input-error'></span>
      <input
        type='text'
        value={description}
        onChange={handleChange}
        placeholder='О себе'
        className='popup__input popup__input_type_job'
        id='job-input'
        name='about'
        minLength='2'
        maxLength='200'
        required
      />
      <span className='popup__input-error' id='job-input-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
