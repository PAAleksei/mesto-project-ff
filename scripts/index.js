// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


 

const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');

function createCard(arrayCard, fnForRemove) {
 
    arrayCard.forEach(function(item){

        const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
        
        cardContent.querySelector('.card__title').textContent = item.name; 
        cardContent.querySelector('.card__image').src = item.link;
        cardContent.querySelector('.card__image').alt = `На картинке ${item.name}`;
        
        placeList.append(cardContent);
    });
    
    const deleteButton = document.querySelectorAll('.card__delete-button');
    
    for (let element of deleteButton) {
        element.addEventListener('click', fnForRemove);
    };   
};

function deleteCard() {
    let removItem = this.parentElement;
    removItem.remove();
}

createCard(initialCards, deleteCard);


