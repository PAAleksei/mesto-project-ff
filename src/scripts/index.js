
import '../pages/index.css';

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

import {
    getInitialCards,
    sendDataProfile, 
    addDataCard,
    sendDataAvatar,
} from'../components/api'

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popUps = document.querySelectorAll('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeEditAvatar = document.querySelector('.popup_type_edit-avatar');

const popUpCloseBtnTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popUpCloseBtnTypeEditAvatar = popupTypeEditAvatar.querySelector('.popup__close');
const popUpCloseBtnTypeNewCard = popupTypeNewCard.querySelector('.popup__close');
const popUpCloseBtnTypeImage = popupTypeImage.querySelector('.popup__close');

const popUpImage = popupTypeImage.querySelector('.popup__image');
const popUpCaption = popupTypeImage.querySelector('.popup__caption');

const formElementTypeEditAvatar = popupTypeEditAvatar.querySelector('.popup__form');
const urlEditAvatar = formElementTypeEditAvatar.querySelector('.popup__input_type_url');
const btnEditProfileAvatar = document.querySelector('.profile__image-edit-button');

const formElementTypeNewCard = popupTypeNewCard.querySelector('.popup__form');
const namePlace = formElementTypeNewCard.querySelector('.popup__input_type_card-name');
const urlCardImage = formElementTypeNewCard.querySelector('.popup__input_type_url');

const formElementTypeEdit = popupTypeEdit.querySelector('.popup__form');
const nameInput = formElementTypeEdit.querySelector('.popup__input_type_name');
const jobInput = formElementTypeEdit.querySelector('.popup__input_type_description');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const validationConfig = {    
    popUpForms: document.querySelectorAll('.popup__form'),
    popUpInput: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'popup__input-error_active',
    inputErrorText: 'popup__input-error-text_active',
    inputLink: '.popup__input_type_url',
};

const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        'Content-Type': 'application/json',   
        authorization: 'ffa59dc2-b1fc-45dc-afaf-4be126fab1b8'
    },
    myId: '19ea88e928ed161791d3bc9f',
    cardsContainer,
    profileImage,
    profileTitle,
    profileDescription,
    formElementTypeEdit,
    formElementTypeNewCard,
    formElementTypeEditAvatar,
    createCard,
    deleteCard,
    likeCard,
    openPopUpImage,
};

getInitialCards(apiConfig);

popUps.forEach(function(element) {
    addClass(element, 'popup_is-animated');
});

function addNewCard(evt) {
    evt.preventDefault();

    const cardData = {
        name: namePlace.value,
        link: urlCardImage.value,
    };
        
    addDataCard(cardData, apiConfig);

    formElementTypeNewCard.reset();
    closePopUp(popupTypeNewCard);
};

function addProfileValues() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

function addNewProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    sendDataProfile(apiConfig);
    closePopUp(popupTypeEdit);
};

function addNewAvatar(evt) {
    evt.preventDefault();

    const url = urlEditAvatar.value;
    sendDataAvatar(url, apiConfig);

    closePopUp(popupTypeEditAvatar);
    formElementTypeEditAvatar.reset();
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

btnEditProfileAvatar.addEventListener('click', () => {
    openPopUp(popupTypeEditAvatar);
    clearValidation(formElementTypeEditAvatar, validationConfig);
});

popUpCloseBtnTypeEditAvatar.addEventListener('click', () => {
    closePopUp(popupTypeEditAvatar);
});

profileAddButton.addEventListener('click', () => {
    openPopUp(popupTypeNewCard);
    clearValidation(formElementTypeNewCard, validationConfig);
});

popUpCloseBtnTypeEdit.addEventListener('click', () => {
    closePopUp(popupTypeEdit);
}); 

popUpCloseBtnTypeNewCard.addEventListener('click', () => {
    closePopUp(popupTypeNewCard);
    clearValidation(formElementTypeNewCard, validationConfig);
}); 

popUpCloseBtnTypeImage.addEventListener('click', () => closePopUp(popupTypeImage));

addListener(formElementTypeEdit, 'submit', addNewProfile);
addListener(formElementTypeNewCard, 'submit', addNewCard);
addListener(formElementTypeEditAvatar, 'submit', addNewAvatar);

enableValidation(validationConfig);
