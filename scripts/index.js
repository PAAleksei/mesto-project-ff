// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


 

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard(cardData, fnForRemove) {
 
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');

    cardTitle.textContent = cardData.name; 
    cardImage.src = cardData.link;
    cardImage.alt = `На картинке ${cardData.name}`;

    deleteButton.addEventListener("click", () => fnForRemove(card));
      
    return card;        
};

function deleteCard(cardElement) {
    cardElement.remove();
};

initialCards.forEach (function addCards(item) {
    const cardContent = createCard(item, deleteCard);
    cardsContainer.append(cardContent);
});


