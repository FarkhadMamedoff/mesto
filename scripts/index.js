import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileAddButton = document.querySelector('.profile__button_type_add');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements');

const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeProfileCloseButton = popupTypeProfile.querySelector('.popup__button_type_close');
const popupTypeProfileForm = popupTypeProfile.querySelector('.popup__block');
const popupTypeProfileName = popupTypeProfile.querySelector('.popup__input_type_name');
const popupTypeProfileProfession = popupTypeProfile.querySelector('.popup__input_type_profession');

const popupTypeAddElement = document.querySelector('.popup_type_add-element');
const popupTypeAddElementCloseButton = popupTypeAddElement.querySelector('.popup__button_type_close');
const popupTypeAddElementForm = popupTypeAddElement.querySelector('.popup__block');
const popupTypeAddElementName = popupTypeAddElement.querySelector('.popup__input_type_name');
const popupTypeAddElementUrl = popupTypeAddElement.querySelector('.popup__input_type_profession');
const popupTypeAddElementSubmitButton = popupTypeAddElement.querySelector('.popup__button_type_submit');

const popupTypeOpenImage = document.querySelector('.popup_type_open-image');
const popupTypeOpenImageCloseButton = popupTypeOpenImage.querySelector('.popup__button_type_close');

const validateObj = {
  formSelector: '.popup__block',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_submit',
  inactiveButtonClass: 'popup__button_state_deactivated',
  inputErrorClass: 'popup__input_mode_error',
  errorClass: 'popup__input-error_state_active'
};

const initialCards = [
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


function createElement(item) {
  const elem = new Card(item, popupTypeOpenImage, openPopup, elementTemplate);
  return elem.createCard();
}

function validatePopup(popupElement) {
  const validator = new FormValidator(popupElement, validateObj);
  validator.enableValidation();
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function hideErrorElementsIfVisible(popupElement) {
  const popupInputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  popupInputList.forEach((inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement.classList.contains('popup__input-error_state_active')) {
      errorElement.classList.remove('popup__input-error_state_active');
      inputElement.classList.remove('popup__input_mode_error');
      errorElement.textContent = '';
    }
  });
}

function openProfilePopup() {
  popupTypeProfileName.value = profileName.textContent;
  popupTypeProfileProfession.value = profileProfession.textContent;
  hideErrorElementsIfVisible(popupTypeProfile);
  openPopup(popupTypeProfile);
  validatePopup(popupTypeProfile);
}


function setNewProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupTypeProfileName.value;
  profileProfession.textContent = popupTypeProfileProfession.value;

  closePopup(popupTypeProfile);
}


function addNewElement(evt) {
  evt.preventDefault();
  elements.prepend(createElement({ name: popupTypeAddElementName.value, link: popupTypeAddElementUrl.value }));
  popupTypeAddElementForm.reset();
  popupTypeAddElementSubmitButton.classList.add('popup__button_state_deactivated');
  popupTypeAddElementSubmitButton.setAttribute('disabled', true);
  closePopup(popupTypeAddElement);
}

function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupToClose = evt.currentTarget.querySelector('.popup_is-opened');
    if (popupToClose !== null) {
      closePopup(popupToClose);
    }
  }
}


initialCards.forEach((item) => {
  elements.append(createElement(item));
});

profileEditButton.addEventListener('click', openProfilePopup);
popupTypeProfileCloseButton.addEventListener('click', function () {
  closePopup(popupTypeProfile);
});

popupTypeOpenImageCloseButton.addEventListener('click', function () {
  closePopup(popupTypeOpenImage);
});


profileAddButton.addEventListener('click', function () {
  openPopup(popupTypeAddElement);
  validatePopup(popupTypeAddElement);
});

popupTypeAddElementCloseButton.addEventListener('click', function () {
  closePopup(popupTypeAddElement);
});

popupTypeProfileForm.addEventListener('submit', setNewProfileInfo);

popupTypeAddElementForm.addEventListener('submit', addNewElement);


popupTypeProfile.addEventListener('click', closePopupByOverlay);
popupTypeAddElement.addEventListener('click', closePopupByOverlay);
popupTypeOpenImage.addEventListener('click', closePopupByOverlay);
