export default class Card {
  constructor(data, popupTypeOpenImage, openImagePopup, cardTemplate) {
    this._nameValue = data.name;
    this._urlValue = data.link;
    this._altValue = data.name;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
    this._popupTypeOpenImage = popupTypeOpenImage;
  }

  createCard() {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this._nameValue;
    imageElement.src = this._urlValue;
    imageElement.alt = this._altValue;

    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__button_type_like-default').addEventListener('click', () => { this._handleLikeCard(); });
    this._element.querySelector('.element__button_type_delete').addEventListener('click', () => { this._handleRemoveCard(); });
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleOpenImage());
  }

  _handleLikeCard() {
    this._element.querySelector('.element__button_type_like-default').classList.toggle('element__button_type_like-active');;
  }

  _handleRemoveCard() {
    this._element.remove();
  }

  _handleOpenImage() {
    this._popupTypeOpenImage.querySelector('.image-container__image').src = this._urlValue;
    this._popupTypeOpenImage.querySelector('.image-container__image').alt = this._altValue;
    this._popupTypeOpenImage.querySelector('.image-container__title').textContent = this._nameValue;
    this._openImagePopup(this._popupTypeOpenImage);
  }

}