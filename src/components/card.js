import {
    cardTemplate,
    cardsContainer,
    popupTypeNewCard,
    popupTypeImage,
    popUpCloseBtnTypeImage,
    namePlace,
    urlCardImage,
} from '../scripts/index';
  
import {
    openPopUp, 
    closePopUp, 
    openPopUpImage,
    clearForms,
} from './modal';
   
function createCard(cardData, fnForRemove) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    
    cardTitle.textContent = cardData.name; 
    cardImage.src = cardData.link;
    cardImage.alt = `На картинке ${cardData.name}`;
  
    deleteButton.addEventListener('click', () => fnForRemove(card));
    likeButton.addEventListener('click', () => likeCards(likeButton, 'card__like-button_is-active'));
    
    cardImage.addEventListener('click', () => openPopUp(popupTypeImage));
    cardImage.addEventListener('click', () => openPopUpImage(cardImage, cardTitle));
    popUpCloseBtnTypeImage.addEventListener('click', () => closePopUp(popupTypeImage));
    
    return card;        
};
  
function addNewCard(evt) {
    evt.preventDefault();

    let cardData = {
            name: namePlace.value,
            link: urlCardImage.value,
        };
        
    let card = createCard(cardData, deleteCard);
  
    cardsContainer.prepend(card); 
    closePopUp(popupTypeNewCard);
    
    clearForms(namePlace, urlCardImage);
};
  
function deleteCard(cardElement) {
    cardElement.remove();
};
  
function likeCards(likeBtn, addingClass) {
    likeBtn.classList.toggle(addingClass);
};
  
export {
    createCard, 
    addNewCard, 
    deleteCard, 
    likeCards
};