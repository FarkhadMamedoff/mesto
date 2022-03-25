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
    this._imageElement = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__button_type_like-default');
    this._deleteButton = this._element.querySelector('.element__button_type_delete');
    this._element.querySelector('.element__title').textContent = this._nameValue;
    this._imageElement.src = this._urlValue;
    this._imageElement.alt = this._altValue;

    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleLikeCard(); });
    this._deleteButton.addEventListener('click', () => { this._handleRemoveCard(); });
    this._imageElement.addEventListener('click', () => { this._handleOpenImage(); });
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('element__button_type_like-active');;
  }

  _handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenImage() {
    const popupImage = this._popupTypeOpenImage.querySelector('.image-container__image');
    popupImage.src = this._urlValue;
    popupImage.alt = this._altValue;
    this._popupTypeOpenImage.querySelector('.image-container__title').textContent = this._nameValue;
    this._openImagePopup(this._popupTypeOpenImage);
  }

}