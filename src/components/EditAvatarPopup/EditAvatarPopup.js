import React, { useEffect, useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onPopupClick }) {
  const avatarInputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarInputRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onPopupClick={onPopupClick}
    >
      <input
        type='url'
        ref={avatarInputRef}
        placeholder='Ссылка на изображение'
        className='popup__input popup__input_type_avatar'
        id='avatar-input'
        name='avatar'
        required
      />
      <span className='popup__input-error' id='avatar-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
