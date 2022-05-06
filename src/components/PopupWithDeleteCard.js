import Popup from "./Popup.js";
import {
  popupFormSelector,
} from "../utils/constants.js";

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(popupFormSelector);
  }

  setCard(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
  }
}