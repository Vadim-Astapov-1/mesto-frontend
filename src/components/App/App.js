import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NavBar from '../NavBar/NavBar';

import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { api } from '../../utils/Api';
import { auth } from '../../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  const [tooltipSuccess, setTooltipSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
  });

  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleBtnHeaderClick() {
    if (isMenuHidden) {
      setIsMenuHidden(false);
    } else {
      setIsMenuHidden(true);
    }
  }

  function handlePopupClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTokenCheck() {
    auth
      .checkToken()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        setEmail(res.email);
        navigate('/main');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setTooltipSuccess(true);
        navigate('/signin');
      })
      .catch((err) => {
        setTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      });
  }

  function handleLoggin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        setCurrentUser(res.user);
        setEmail(email);
        setLoggedIn(true);
        navigate('/main');
      })
      .catch((err) => {
        setTooltipSuccess(false);
        setIsTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      function closeEsc(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', closeEsc);

      return () => {
        document.removeEventListener('keydown', closeEsc);
      };
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);

  useEffect(() => {
    setIsMenuHidden(true);
  }, [location.pathname]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((cardList) => {
          setCards(cardList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleBtnHeaderClick={handleBtnHeaderClick}>
          <NavBar isHidden={isMenuHidden} email={email} onLogout={handleLogout} />
        </Header>
        <Routes>
          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='/signin' element={<Login onLogin={handleLoggin} />} />
          <Route
            path='/main'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  onPopupClick={handlePopupClick}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  onPopupClick={handlePopupClick}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  onPopupClick={handlePopupClick}
                />
                <PopupWithForm
                  name='confirm'
                  title='Вы уверены?'
                  specialLayout
                  buttonText='Да'
                  onPopupClick={handlePopupClick}
                />
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                  onPopupClick={handlePopupClick}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Navigate to='/main' />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <InfoTooltip
          status={tooltipSuccess}
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          onPopupClick={handlePopupClick}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
