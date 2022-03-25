export default class FormValidator {
  constructor(Popup, validateObj) {
    this._popup = Popup;
    this._validateObj = validateObj;
  }


  enableValidation() {
    this._element = this._popup.querySelector(this._validateObj.formSelector);
    this._inputList = Array.from(this._element.querySelectorAll(this._validateObj.inputSelector));
    this._buttonElement = this._element.querySelector(this._validateObj.submitButtonSelector);
    this._setEventListeners();
  }

  _setEventListeners() {

    this._editButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
        } else {
          this._hideInputError(inputElement);
        }
        this._editButtonState();
      });
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validateObj.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validateObj.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validateObj.inputErrorClass);
    errorElement.classList.remove(this._validateObj.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _editButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validateObj.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._validateObj.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
}
