function checkRegExp(inputElement) {
    const regex = /[^a-zа-яА-Я\sЁё\-]/gi;
    return regex.test(inputElement.value);
};

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(validationConfig.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(validationConfig.inputErrorText);
};

function hideInputError(formElement, inputElement, validationConfig) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationConfig.inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(validationConfig.inputErrorText);
};

function isValid(formElement, inputElement, validationConfig) {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
    else if(checkRegExp(inputElement)&inputElement!=document.querySelector(validationConfig.inputLink)) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage, validationConfig);
    } 
    else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

function hasInvalidInput(inputList, validationConfig) {
    return inputList.some((inputElement) => {
        if(!inputElement.validity.valid) {
            return !inputElement.validity.valid;
        }
        else if(checkRegExp(inputElement)&inputElement!=document.querySelector(validationConfig.inputLink)) {
            return checkRegExp(inputElement);
        }
    })
};

function toggleButtonState(inputList, buttonElement, validationConfig) {
    if(hasInvalidInput(inputList, validationConfig)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } 
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

function setEventListenersForInputs(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.popUpInput));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.popUpInput));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
    });
};

function enableValidation(validationConfig) {
    const formList = Array.from(validationConfig.popUpForms);
    
    formList.forEach((formElement) => {
        setEventListenersForInputs(formElement, validationConfig);
    });
};

export {enableValidation, clearValidation};
