import {
  cardImageSelector,
  cardButtonLikeSelector,
  cardButtonLikeActiveSelector,
  cardButtonDeleteSelector,
  cardTitleSelector,
  cardElementSelector
} from "../utils/constants.js";

export default class Card {
  constructor(data, handleCardClick, cardTemplate) {
    this._nameValue = data.name;
    this._urlValue = data.link;
    this._altValue = data.name;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;

  }

  createCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(cardImageSelector);
    this._likeButton = this._element.querySelector(cardButtonLikeSelector);
    this._deleteButton = this._element.querySelector(cardButtonDeleteSelector);
    this._element.querySelector(cardTitleSelector).textContent = this._nameValue;
    this._imageElement.src = this._urlValue;
    this._imageElement.alt = this._altValue;

    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content.querySelector(cardElementSelector).cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleLikeCard(); });
    this._deleteButton.addEventListener('click', () => { this._handleRemoveCard(); });
    this._imageElement.addEventListener('click', () => { this._handleCardClick(); });
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle(cardButtonLikeActiveSelector);
  }

  _handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }
}