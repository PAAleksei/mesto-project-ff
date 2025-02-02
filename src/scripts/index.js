
import '../pages/index.css';

import {initialCards} from '../components/cards';

import {    
    createCard, 
    deleteCard, 
} from '../components/card';

import { 
    openPopUp, 
    closePopUp, 
} from '../components/modal';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popUps = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const popUpCloseBtnTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popUpCloseBtnTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const popUpCloseBtnTypeImage = popupTypeImage.querySelector('.popup__close');

const formElementTypeEdit = popupTypeEdit.querySelector('.popup__form');
const nameInput = formElementTypeEdit.querySelector('.popup__input_type_name');
const jobInput = formElementTypeEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formElementTypeNewCard = popupTypeNewCard.querySelector('.popup__form');
const namePlace = formElementTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardImage = formElementTypeNewCard.querySelector('.popup__input_type_url');

const popUpImage = popupTypeImage.querySelector('.popup__image');
const popUpCaption = popupTypeImage.querySelector('.popup__caption');

initialCards.forEach(function addCards(item) {
    const cardContent = createCard(item, deleteCard);
    cardsContainer.append(cardContent);
});

popUps.forEach(function(element) {
    element.style.display = 'block';
    element.style.opacity = '0';
    element.style.height = '0';
    element.style.position = 'relative';
});

profileEditButton.addEventListener('click', () => openPopUp(popupTypeEdit));
profileAddButton.addEventListener('click', () => openPopUp(popupTypeNewCard));

popUpCloseBtnTypeEdit.addEventListener('click', () => closePopUp(popupTypeEdit)); 
popUpCloseBtnTypeNewCard.addEventListener('click', () => closePopUp(popupTypeNewCard)); 

export {
    cardTemplate,
    cardsContainer,
    profileEditButton,
    profileAddButton,
    popUps,
    popupTypeEdit,
    popupTypeNewCard,
    popupTypeImage,
    popUpCloseBtnTypeEdit,
    popUpCloseBtnTypeNewCard,
    popUpCloseBtnTypeImage,
    formElementTypeEdit,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    formElementTypeNewCard,
    namePlace,
    urlCardImage,
    popUpImage,
    popUpCaption,
};
