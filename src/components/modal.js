import {
    popupTypeEdit,
    formElementTypeEdit,
    formElementTypeNewCard,
    nameInput,
    jobInput,
    profileTitle,
    profileDescription,
    popUpImage,
    popUpCaption,
} from '../scripts/index';

import {addNewCard} from './card';

function clearProperties(element) {
    element.style.display = '';
    element.style.opacity = '';
    element.style.height = '';
    element.style.position = '';
};

function clearForms(name, description) {
    name.value = '';
    description.value = '';
};

function addClass(element, addingClass) {
    element.classList.add(addingClass);
    clearProperties(element);
};

function removeClass(element, removingClass) {
    element.classList.remove(removingClass);
};

function addListener(element, event, functionCallBack) {
    element.addEventListener(event, functionCallBack);
};

function removeListener(element, event, functionCallBack) {
    element.removeEventListener(event, functionCallBack);
};

function closeByEscape(evt) {
    let closingPopUp = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape') {
        closePopUp(closingPopUp);
     };
};

function closeByOverlay(evt) {
    let closingPopUp = document.querySelector('.popup_is-opened');
    const popUpContent = closingPopUp.querySelector('.popup__content');

    if(!popUpContent.contains(evt.target)) {
        closePopUp(closingPopUp);
    }
};

function openPopUp(popUp) {
    addClass(popUp, 'popup_is-opened');
    addClass(popUp, 'popup_is-animated');
    addListener(document, 'keydown', closeByEscape);
    addListener(popUp, 'click', closeByOverlay);
    addListener(formElementTypeEdit, 'submit', addNewProfile);
    addListener(formElementTypeNewCard, 'submit', addNewCard);
};

function closePopUp(popUp) {
    removeClass(popUp, 'popup_is-opened');
    removeListener(document, 'keydown', closeByEscape);
    removeListener(popUp, 'click', closeByOverlay);
    removeListener(formElementTypeEdit, 'submit', addNewProfile);
    removeListener(formElementTypeNewCard, 'submit', addNewCard);
};

function addNewProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopUp(popupTypeEdit);
    
    clearForms(nameInput, jobInput);
};

function openPopUpImage(image, titleOfPlace) {
    popUpImage.src = image.src;
    popUpImage.alt = `На картинке ${titleOfPlace.textContent}`;
    popUpCaption.textContent = titleOfPlace.textContent;
};

export {
    removeClass,
    addListener,
    openPopUp, 
    closePopUp,
    clearForms, 
    addNewProfile,
    openPopUpImage,
};