export const profileEditButton = document.querySelector('.profile__button_type_edit');
export const profileAddButton = document.querySelector('.profile__button_type_add');
export const profileName = document.querySelector('.profile__title');
export const profileProfession = document.querySelector('.profile__subtitle');

export const elementTemplate = document.querySelector('#element-template');
export const elements = document.querySelector('.elements');

export const popupTypeProfile = document.querySelector('.popup_type_profile');
export const popupTypeAddElement = document.querySelector('.popup_type_add-element');
export const popupTypeOpenImage = document.querySelector('.popup_type_open-image');

export const popupOpenedSelector = 'popup_is-opened';
export const popupButtonCloseSelector = '.popup__button_type_close';
export const popupFormSelector = '.popup__block';
export const popupInputSelector = '.popup__input';
export const popupImageSelector = '.image-container__image';
export const popupImageTitleSelector = '.image-container__title';


export const cardImageSelector = '.element__image';
export const cardButtonLikeSelector = '.element__button_type_like-default';
export const cardButtonLikeActiveSelector = 'element__button_type_like-active';
export const cardButtonDeleteSelector = '.element__button_type_delete';
export const cardTitleSelector = '.element__title';
export const cardElementSelector = '.element';


export const validateObj = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_state_deactivated',
  inputErrorClass: 'popup__input_mode_error',
  errorClass: 'popup__input-error_state_active'
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];