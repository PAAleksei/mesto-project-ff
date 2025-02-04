export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const formElementTypeEdit = popupTypeEdit.querySelector('.popup__form');
export const nameInput = formElementTypeEdit.querySelector('.popup__input_type_name');
export const jobInput = formElementTypeEdit.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

const popUpImage = popupTypeImage.querySelector('.popup__image');
const popUpCaption = popupTypeImage.querySelector('.popup__caption');

export function addClass(element, addingClass) {
    element.classList.add(addingClass);
};

function removeClass(element, removingClass) {
    element.classList.remove(removingClass);
};

export function addListener(element, event, functionCallBack) {
    element.addEventListener(event, functionCallBack);
};

function removeListener(element, event, functionCallBack) {
    element.removeEventListener(event, functionCallBack);
};

function closeByEscape(evt) {
    const closingPopUp = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape') {
        closePopUp(closingPopUp);
     };
};

function closeByOverlay(evt) {
    if (!evt.target.classList.contains('.popup__content')) {
        closePopUp(evt.target)
     };
};

function addProfileDataPlacholder() {
    nameInput.placeholder = profileTitle.textContent;
    jobInput.placeholder = profileDescription.textContent;
};

export function openPopUp(popUp) {
    addClass(popUp, 'popup_is-opened');
    addListener(document, 'keydown', closeByEscape);
    addListener(popUp, 'click', closeByOverlay);
    addProfileDataPlacholder();
};

export function closePopUp(popUp) {
    removeClass(popUp, 'popup_is-opened');
    removeListener(document, 'keydown', closeByEscape);
    removeListener(popUp, 'click', closeByOverlay);
};

export function openPopUpImage(image, titleOfPlace) {
    popUpImage.src = image.src;
    popUpImage.alt = `На картинке ${titleOfPlace.textContent}`;
    popUpCaption.textContent = titleOfPlace.textContent;
    openPopUp(popupTypeImage);
};