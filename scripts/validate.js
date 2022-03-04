const validateObj = {
  formSelector: '.popup__block',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_state_deactivated',
  inputErrorClass: 'popup__input_mode_error',
  errorClass: 'popup__input-error_state_active'
};

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function editButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function setEventListeners(popupElement, obj) {
  const inputList = Array.from(popupElement.querySelectorAll(obj.inputSelector));
  const buttonElement = popupElement.querySelector(obj.submitButtonSelector);


  editButtonState(inputList, buttonElement, obj.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      if (!inputElement.validity.valid) {
        showInputError(popupElement, inputElement, inputElement.validationMessage, obj.inputErrorClass, obj.errorClass);
      } else {
        hideInputError(popupElement, inputElement, obj.inputErrorClass, obj.errorClass);
      }
      editButtonState(inputList, buttonElement, obj.inactiveButtonClass);
    });
  });
}

function enableValidation(obj) {
  const popupList = Array.from(document.querySelectorAll(obj.formSelector));
  popupList.forEach((popupElement) => {
    setEventListeners(popupElement, obj);
  });
}

enableValidation(validateObj);