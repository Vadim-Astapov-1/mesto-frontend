import React, { useContext } from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Main({
  handleEditProfileClick,
  handleEditAvatarClick,
  handleAddPlaceClick,
  handleCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile'>
        <img src={currentUser.avatar} alt='Аватар' className='profile__avatar' />
        <div className='profile__avatar-button' onClick={handleEditAvatarClick}></div>
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <button
            className='profile__edit-button'
            type='button'
            onClick={handleEditProfileClick}
          ></button>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-button'
          type='button'
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className='elements'>
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
