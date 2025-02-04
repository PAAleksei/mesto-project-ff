
import '../pages/index.css';

import {initialCards} from '../components/cards';

import {    
    createCard, 
    deleteCard,
    likeCard,
} from '../components/card';

import { 
    popupTypeEdit,
    popupTypeImage,
    formElementTypeEdit,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    openPopUp, 
    closePopUp,
    openPopUpImage,
    addClass,
    addListener,
} from '../components/modal';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popUps = document.querySelectorAll('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popUpCloseBtnTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popUpCloseBtnTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const popUpCloseBtnTypeImage = popupTypeImage.querySelector('.popup__close');

const formElementTypeNewCard = popupTypeNewCard.querySelector('.popup__form');
const namePlace = formElementTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardImage = formElementTypeNewCard.querySelector('.popup__input_type_url');

initialCards.forEach(function addCards(item) {
    const cardContent = createCard(item, deleteCard, likeCard, openPopUpImage);
    cardsContainer.append(cardContent);
});

popUps.forEach(function(element) {
    addClass(element, 'popup_is-animated');
});

function addNewCard(evt) {
    evt.preventDefault();

    const cardData = {
            name: namePlace.value,
            link: urlCardImage.value,
        };
        
    const card = createCard(cardData, deleteCard, likeCard, openPopUpImage);
  
    cardsContainer.prepend(card); 
    closePopUp(popupTypeNewCard);
    
    formElementTypeNewCard.reset();
};

function addNewProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopUp(popupTypeEdit);

    formElementTypeEdit.reset();
};

profileEditButton.addEventListener('click', () => openPopUp(popupTypeEdit));
profileAddButton.addEventListener('click', () => openPopUp(popupTypeNewCard));

popUpCloseBtnTypeEdit.addEventListener('click', () => closePopUp(popupTypeEdit)); 
popUpCloseBtnTypeNewCard.addEventListener('click', () => closePopUp(popupTypeNewCard)); 

popUpCloseBtnTypeImage.addEventListener('click', () => closePopUp(popupTypeImage));

addListener(formElementTypeEdit, 'submit', addNewProfile);
addListener(formElementTypeNewCard, 'submit', addNewCard);