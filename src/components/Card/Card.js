import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleClick() {
    onCardClick({ name: card.name, link: card.link });
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className='element'>
      <button
        className={`element__remove-button ${
          isOwn ? 'element__remove-button_visible' : 'element__remove-button_hidden'
        }`}
        onClick={handleCardDelete}
        type='button'
      ></button>
      <img className='element__image' src={card.link} alt={card.name} onClick={handleClick} />
      <div className='element__body'>
        <h3 className='element__title'>{card.name}</h3>
        <div className='element__like-container'>
          <button
            className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`}
            onClick={handleCardLike}
            type='button'
          ></button>
          <p className='element__like-count'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
