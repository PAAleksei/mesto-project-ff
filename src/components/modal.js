function addClass(element, addingClass) {
    element.classList.add(addingClass);
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
    if(evt.key === 'Escape') {
        const closingPopUp = document.querySelector('.popup_is-opened');
        closePopUp(closingPopUp);
     };
};

function closeByOverlay(evt) {
    if (!evt.target.classList.contains('.popup__content')) {
        closePopUp(evt.target)
     };
};

function openPopUp(popUp) {
    addClass(popUp, 'popup_is-opened');
    addListener(document, 'keydown', closeByEscape);
    addListener(popUp, 'click', closeByOverlay);
};

function closePopUp(popUp) {
    removeClass(popUp, 'popup_is-opened');
    removeListener(document, 'keydown', closeByEscape);
    removeListener(popUp, 'click', closeByOverlay);
};

export {addClass, addListener, openPopUp, closePopUp};