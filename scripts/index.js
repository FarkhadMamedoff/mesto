const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileAddButton = document.querySelector('.profile__button_type_add');
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');

const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__button_type_close');
const popupForm = popup.querySelector('.popup__block');
const popupName = popup.querySelector('.popup__input_type_name');
const popupProfession = popup.querySelector('.popup__input_type_profession');
const popupSubmitButton = popup.querySelector('.popup__button_type_submit');

const popupTypeAddElement = document.querySelector('.popup_type_add-element');
const popupTypeAddElementCloseButton = popupTypeAddElement.querySelector('.popup__button_type_close');
const popupTypeAddElementForm = popupTypeAddElement.querySelector('.popup__block');
const popupTypeAddElementName = popupTypeAddElement.querySelector('.popup__input_type_name');
const popupTypeAddElementUrl = popupTypeAddElement.querySelector('.popup__input_type_profession');

const popupTypeOpenImage = document.querySelector('.popup_type_open-image');
const popupTypeOpenImageCloseButton = popupTypeOpenImage.querySelector('.popup__button_type_close');
const popupTypeOpenImageMainImage = popupTypeOpenImage.querySelector('.image-container__image');
const popupTypeOpenImageTitle = popupTypeOpenImage.querySelector('.image-container__title');


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

function createElement(nameValue, urlValue, altValue = nameValue) {

  const element = elementTemplate.cloneNode(true);

  element.querySelector('.element__title').textContent = nameValue;
  element.querySelector('.element__image').src = urlValue;
  element.querySelector('.element__image').alt = altValue;

  element.querySelector('.element__button_type_like-default').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_type_like-active');
  });

  element.querySelector('.element__image').addEventListener('click', function (evt) {
    openImagePopup(evt.target.closest('.element').querySelector('.element__title').textContent, evt.target.src, evt.target.alt);
  });

  element.querySelector('.element__button_type_delete').addEventListener('click', function (evt) {
    const elementToRemove = evt.target.closest('.element');
    elementToRemove.remove();
  });
  return element;
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
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
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;

  const arr =[popupName, popupProfession];

  editButtonState(arr, popupSubmitButton, 'popup__button_state_deactivated');
  openPopup(popup);
}

function openImagePopup(title, url, alt) {
  popupTypeOpenImageMainImage.src = url;
  popupTypeOpenImageMainImage.alt = alt;
  popupTypeOpenImageTitle.textContent = title;

  openPopup(popupTypeOpenImage);
}

function setNewProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;

  closePopup(popup);
}


function addNewElement(evt) {
  evt.preventDefault();
  elements.prepend(createElement(popupTypeAddElementName.value, popupTypeAddElementUrl.value));

  closePopup(popupTypeAddElement);
}

function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    hideErrorElementsIfVisible(evt.currentTarget);
    closePopup(evt.currentTarget);
  }
}

function closePopupByEsc(evt)
{
  if (evt.key === 'Escape') {
    const popupToClose = evt.currentTarget.querySelector('.popup_is-opened');
    if (popupToClose !== null) {
      hideErrorElementsIfVisible(popupToClose);
      closePopup(popupToClose);
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }
}


initialCards.forEach((item) => {
  const elem = createElement(item.name, item.link);
  elements.append(elem);
});

profileEditButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', function () {
  hideErrorElementsIfVisible(popup);
  closePopup(popup);
});

popupTypeOpenImageCloseButton.addEventListener('click', function () {

  closePopup(popupTypeOpenImage);
});


profileAddButton.addEventListener('click', function () {
  popupTypeAddElementForm.reset();

  openPopup(popupTypeAddElement);
});

popupTypeAddElementCloseButton.addEventListener('click', function () {
  hideErrorElementsIfVisible(popupTypeAddElement);
  closePopup(popupTypeAddElement);
});

popupForm.addEventListener('submit', setNewProfileInfo);
popupTypeAddElementForm.addEventListener('submit', addNewElement);

popup.addEventListener('click', closePopupByOverlay);
popupTypeAddElement.addEventListener('click', closePopupByOverlay);
popupTypeOpenImage.addEventListener('click', closePopupByOverlay);
