import {
  popupOpenedSelector,
  popupButtonCloseSelector
} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add(popupOpenedSelector);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(popupOpenedSelector);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(popupButtonCloseSelector).addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
}