import Popup from "./Popup.js";
import {
  popupFormSelector,
  popupInputSelector,
  popupSubmitButtonSelector
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(popupFormSelector);
    this._inputList = this._popupForm.querySelectorAll(popupInputSelector);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  getForm() {
    return this._popupForm;
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach(inputElement => {
      this._inputValues[inputElement.id] = inputElement.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    const submitButton = this._popupForm.querySelector(popupSubmitButtonSelector);
    if (isLoading) {
      submitButton.textContent = 'Сохранение...';
    }
    else {
      submitButton.textContent = 'Сохранить';
    }
  }
}