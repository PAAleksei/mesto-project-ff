const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, fnForRemove, fnForLike, openPopUpImage, apiconfig) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    
    const numberOfLikes = likeButton.querySelector('.card__like-button-numbers-of-likes');

    cardTitle.textContent = cardData.name; 
    cardImage.src = cardData.link;
    cardImage.alt = `На картинке ${cardData.name}`;
    
    numberOfLikes.textContent = cardData.likes.length;

        if(cardData.owner._id !== apiconfig.myId){
            deleteButton.setAttribute('style', 'display: none');
        };

    cardData.likes.forEach((item) => {
        if(item._id == apiconfig.myId) {
            likeButton.classList.add('card__like-button_is-active');
        }
    })

    deleteButton.addEventListener('click', () => fnForRemove(card, apiconfig, cardData._id));
    likeButton.addEventListener('click', () => fnForLike(likeButton, numberOfLikes, apiconfig, cardData._id));
    cardImage.addEventListener('click', () => openPopUpImage(cardImage, cardTitle));
    
    return card;        
};
  
function deleteCard(cardElement, apiconfig, cardId) {
    apiconfig.deleteCardData(cardId, apiconfig)
    .then(() =>  cardElement.remove())
    .catch((err) => {
        console.log(err);
      });
};

function likeTheCard(likeCard, numberOfLikes, apiConfig, cardId) {
    const haveClass = likeCard.classList.contains("card__like-button_is-active");
    if (haveClass) {
        apiConfig.deleteLike(cardId, apiConfig)
        .then((card) => {
          likeCard.classList.remove("card__like-button_is-active");
          numberOfLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
        apiConfig.addLike(cardId, apiConfig)
        .then((card) => {
          likeCard.classList.add("card__like-button_is-active");
          numberOfLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

export {createCard, deleteCard, likeTheCard};