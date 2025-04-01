
import '../pages/index.css';

import {initialCards} from '../components/cards';

import {    
    createCard, 
    deleteCard,
    likeCard,
} from '../components/card';

import { 
    addClass,
    addListener,
    openPopUp, 
    closePopUp,
} from '../components/modal';

import {
    enableValidation, 
    clearValidation, 
} from '../components/validation'

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popUps = document.querySelectorAll('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popUpCloseBtnTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popUpCloseBtnTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const popUpCloseBtnTypeImage = popupTypeImage.querySelector('.popup__close');
const popUpImage = popupTypeImage.querySelector('.popup__image');
const popUpCaption = popupTypeImage.querySelector('.popup__caption');

const formElementTypeNewCard = popupTypeNewCard.querySelector('.popup__form');
const namePlace = formElementTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardImage = formElementTypeNewCard.querySelector('.popup__input_type_url');

const formElementTypeEdit = popupTypeEdit.querySelector('.popup__form');
const nameInput = formElementTypeEdit.querySelector('.popup__input_type_name');
const jobInput = formElementTypeEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');


const validationConfig = {    
    popUpForms: document.querySelectorAll('.popup__form'),
    popUpInput: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'popup__input-error_active',
    inputErrorText: 'popup__input-error-text_active',
    inputLink: '#link-input',
};

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

function addProfileValues() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

function openPopUpImage(image, titleOfPlace) {
    popUpImage.src = image.src;
    popUpImage.alt = `На картинке ${titleOfPlace.textContent}`;
    popUpCaption.textContent = titleOfPlace.textContent;
    openPopUp(popupTypeImage);
};

profileEditButton.addEventListener('click', () => {
    openPopUp(popupTypeEdit);
    addProfileValues();
    clearValidation(formElementTypeEdit, validationConfig);
});

profileAddButton.addEventListener('click', () => {
    openPopUp(popupTypeNewCard);
    clearValidation(formElementTypeNewCard, validationConfig);
});

popUpCloseBtnTypeEdit.addEventListener('click', () => closePopUp(popupTypeEdit)); 

popUpCloseBtnTypeNewCard.addEventListener('click', () => {
    closePopUp(popupTypeNewCard);
    clearValidation(formElementTypeNewCard, validationConfig);
}); 

popUpCloseBtnTypeImage.addEventListener('click', () => closePopUp(popupTypeImage));

addListener(formElementTypeEdit, 'submit', addNewProfile);
addListener(formElementTypeNewCard, 'submit', addNewCard);

enableValidation(validationConfig);

fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'ffa59dc2-b1fc-45dc-afaf-4be126fab1b8'
    }
})
.then(res => res.json())
.then((result) => {
    
    profileImage.setAttribute('Style', `background-image: url(${result.avatar})`);
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
});