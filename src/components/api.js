const getInitialCards = (apiConfig) => {
    
return  Promise.all([
        fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers
        })
      ,
        fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'GET',
        headers: apiConfig.headers
        }) 
    ])
    .then(([responseDataUser, responseDataCards]) => {
        
        const objectUser = getResponseData(responseDataUser); 
        objectUser.then((result) => {
            
            apiConfig.profileImage.setAttribute('Style', `background-image: url(${result.avatar})`);
            apiConfig.profileTitle.textContent = result.name;
            apiConfig.profileDescription.textContent = result.about;
        })
        
        const objectCards = getResponseData(responseDataCards); 
        objectCards.then((result) => {

            result.forEach(function addCards(item) {
                const cardContent = apiConfig.createCard(item, apiConfig.deleteCard, apiConfig.likeCard, apiConfig.openPopUpImage, apiConfig);
                const cardLikeButton = cardContent.querySelector('.card__like-button');
                const numberOfLikes = cardLikeButton.querySelector('.card__like-button-numbers-of-likes');
                const deleteButton = cardContent.querySelector('.card__delete-button');
                
                numberOfLikes.textContent = item.likes.length;
        
                if(item.owner._id!==apiConfig.myId){
                    deleteButton.setAttribute('style', 'display: none');
                };

                deleteButton.addEventListener('click', () => deleteCardData(item._id, apiConfig));
                cardLikeButton.addEventListener('click', () => {

                if(cardLikeButton.classList.contains('card__like-button_is-active')) {
                    addLike(item._id, numberOfLikes, apiConfig);
                }
                else{
                    deleteLike(item._id, numberOfLikes, apiConfig);
                }
            });
            apiConfig.cardsContainer.append(cardContent);
            });
        })
    })
    .catch((err => console.log(`Ошибка.....: ${err}`)))
};

function sendDataProfile(valueName, valueAbout, apiConfig) {
    const button = apiConfig.formElementTypeEdit.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: valueName,
            about: valueAbout
        })
    })
    .then((res) => getResponseData(res))
    .then((dataObject) => {
        
        apiConfig.profileTitle.textContent = dataObject.name;
        apiConfig.profileDescription.textContent = dataObject.about;

        apiConfig.closePopUp(apiConfig.popupTypeEdit);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => button.textContent = 'Сохранить')
};

function addDataCard(cardData, apiConfig) {
    const button = apiConfig.formElementTypeNewCard.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    .then((res) => getResponseData(res))
    .then((dataObject) => {

        const card = apiConfig.createCard(dataObject, apiConfig.deleteCard, apiConfig.likeCard, apiConfig.openPopUpImage, apiConfig);
        const cardLikeButton = card.querySelector('.card__like-button');
        const numberOfLikes = cardLikeButton.querySelector('.card__like-button-numbers-of-likes');
        const deleteButton = card.querySelector('.card__delete-button');

        numberOfLikes.textContent = dataObject.likes.length;

        deleteButton.addEventListener('click', () => deleteCardData(dataObject._id, apiConfig));
        cardLikeButton.addEventListener('click', () => {

        if(cardLikeButton.classList.contains('card__like-button_is-active')) {
            addLike(dataObject._id, numberOfLikes, apiConfig);
        }
        else{
            deleteLike(dataObject._id, numberOfLikes, apiConfig);
        }
        });
        apiConfig.cardsContainer.prepend(card);
        apiConfig.closePopUp(apiConfig.popupTypeNewCard);
    }) 
    
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => button.textContent = 'Сохранить')
};

function sendDataAvatar(link, apiConfig) {
    const button = apiConfig.formElementTypeEditAvatar.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: link
        }),
        headers: apiConfig.headers
    })
    .then((res) => getResponseData(res))
    .then(() => {
        apiConfig.profileImage.setAttribute('Style', `background-image: url(${link})`);
        apiConfig.closePopUp(apiConfig.popupTypeEditAvatar);
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => button.textContent = 'Сохранить')
};

function deleteCardData(cardId, apiConfig) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    });
};

function addLike(cardId, numberOfLikes, apiConfig) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
    .then(res => getResponseData(res))
    .then((result) => {
        numberOfLikes.textContent = result.likes.length;
    })
    .catch((err) => {
        console.log(err);
    })
};

function deleteLike(cardId, numberOfLikes, apiConfig) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then(res => getResponseData(res))
    .then((result) => {
        numberOfLikes.textContent = result.likes.length;
    })
    .catch((err) => {
        console.log(err);
    })
};

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export {getInitialCards, sendDataProfile, addDataCard, sendDataAvatar};