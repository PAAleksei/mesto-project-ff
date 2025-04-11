
function getDataProfile(apiConfig) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers
        })
        .then((res) => getResponseData(res))
};

function getDataCards(apiConfig) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'GET',
        headers: apiConfig.headers
        }) 
        .then((res) => getResponseData(res))
};

function sendDataProfile(valueName, valueAbout, apiConfig) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: valueName,
            about: valueAbout
        })
    })
    .then((res) => getResponseData(res))    
};

function sendDataCard(cardData, apiConfig) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    .then((res) => getResponseData(res)) 
};

function sendDataAvatar(link, apiConfig) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
            avatar: link
        }),
        headers: apiConfig.headers
    })
    .then((res) => getResponseData(res))
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

export {getDataProfile, getDataCards, sendDataProfile, sendDataCard, sendDataAvatar, deleteCardData, addLike, deleteLike};