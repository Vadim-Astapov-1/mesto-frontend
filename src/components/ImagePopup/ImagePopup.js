import React from 'react';

function ImagePopup({ card, onClose, onPopupClick }) {
  return (
    <div className={`popup popup_type_card ${card ? 'popup_opened' : ''}`} onClick={onPopupClick}>
      <div className='popup__card'>
        <button className='popup__close-button' type='button' onClick={onClose}></button>
        <img className='popup__image' src={card ? card.link : ''} alt={card ? card.name : ''} />
        <p className='popup__title-card'>{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
