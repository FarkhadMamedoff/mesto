import {
  cardImageSelector,
  cardButtonLikeSelector,
  cardButtonLikeActiveSelector,
  cardButtonDeleteSelector,
  cardTitleSelector,
  cardElementSelector,
  cardLikesCounterSelector
} from "../utils/constants.js";

export default class Card {
  constructor(data, currentUserId, handleCardClick, handleRemoveCard, hadleLikeCard, cardTemplate) {
    this._nameValue = data.name;
    this._urlValue = data.link;
    this._altValue = data.name;
    this._cardId = data._id;
    this._cardLikes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeCard = hadleLikeCard;
    this._hasLike = this._cardLikes.some((user) => { return user._id === this._currentUserId; });
  }

  getCardId() {
    return this._cardId;
  }

  createCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(cardImageSelector);
    this._likeButton = this._element.querySelector(cardButtonLikeSelector);
    this._deleteButton = this._element.querySelector(cardButtonDeleteSelector);
    this._likeCounter = this._element.querySelector(cardLikesCounterSelector);
    this._element.querySelector(cardTitleSelector).textContent = this._nameValue;
    this._imageElement.src = this._urlValue;
    this._imageElement.alt = this._altValue;
    this._likeCounter.textContent = this._cardLikes.length;
    if (this._cardOwnerId !== this._currentUserId) {
      this._deleteButton.remove();
    }

    if (this._hasLike) {
      this.like();
    }
    else {
      this.dislike();
    }
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

  _handleLikeButton() {
    this._likeButton.classList.add(cardButtonLikeActiveSelector);
  }

  _handleDislikeButton() {
    this._likeButton.classList.remove(cardButtonLikeActiveSelector);
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  hasLike() {
    return this._hasLike;
  }

  like() {
    this._handleLikeButton();
    this._hasLike = true;
  }

  dislike() {
    this._handleDislikeButton();
    this._hasLike = false;
  }

  updateLikes(likes) {
    this._cardLikes = likes;
    this._likeCounter.textContent = this._cardLikes.length;
  }

}