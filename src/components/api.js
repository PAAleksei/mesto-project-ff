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
        
        const objectUser = responseDataUser.json();
        objectUser.then((result) => {
            
            apiConfig.profileImage.setAttribute('Style', `background-image: url(${result.avatar})`);
            apiConfig.profileTitle.textContent = result.name;
            apiConfig.profileDescription.textContent = result.about;
        })
        
        const objectCards = responseDataCards.json();
        objectCards.then((result) => {

            result.forEach(function addCards(item) {
                const cardContent = apiConfig.createCard(item, apiConfig.deleteCard, apiConfig.likeCard, apiConfig.openPopUpImage);
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
    .catch((err) => {
        console.log(err);
    })
};

async function sendDataProfile(apiConfig) {
    const button = apiConfig.formElementTypeEdit.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    let data = await fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: apiConfig.profileTitle.textContent,
            about: apiConfig.profileDescription.textContent
        })
    });

    if (data.ok) {
        button.textContent = 'Сохранить';
    }
};

async function addDataCard(cardData, apiConfig) {
    const button = apiConfig.formElementTypeNewCard.querySelector('.popup__button');

    button.textContent = 'Сохранение...';

    let data = await fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    let dataObject = await data.json();
    
    const card = apiConfig.createCard(cardData, apiConfig.deleteCard, apiConfig.likeCard, apiConfig.openPopUpImage);
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

    if (data.ok) {
        button.textContent = 'Сохранить';
    }
};

async function sendDataAvatar(link, apiConfig) {
    const button = apiConfig.formElementTypeEditAvatar.querySelector('.popup__button');
    button.textContent = 'Сохранение...';

    let data = await fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: link
        }),
        headers: apiConfig.headers
    })
    if (data.ok) {
        apiConfig.profileImage.setAttribute('Style', `background-image: url(${link})`);
        button.textContent = 'Сохранить';
    }
};

function deleteCardData(cardId, apiConfig) {
    fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    });
};

function addLike(cardId, numberOfLikes, apiConfig) {
    fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
    .then(res => {
        if(res.ok) {
        return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        numberOfLikes.textContent = result.likes.length;
    })
    .catch((err) => {
        console.log(err);
      })
};

function deleteLike(cardId, numberOfLikes, apiConfig) {
    fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then(res => {
        if(res.ok) {
        return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        numberOfLikes.textContent = result.likes.length;
    })
    .catch((err) => {
        console.log(err);
      })
};

export {getInitialCards, sendDataProfile, addDataCard, sendDataAvatar};