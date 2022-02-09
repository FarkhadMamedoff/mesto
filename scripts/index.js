const profileEditButton = document.querySelector('.profile__button_type_edit');
const popupCloseButton = document.querySelector('.popup__button_type_close');
const popupForm = document.querySelector('.popup__block');

const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');

const popup = document.querySelector('.popup');


function openProfilePopup() {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;

  popup.classList.add('popup_is-opened');
}


function setNewProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;

  closeProfilePopup();
}


function closeProfilePopup() {
  popup.classList.remove('popup_is-opened');
}

profileEditButton.addEventListener('click', openProfilePopup);
popupCloseButton.addEventListener('click', closeProfilePopup);

popupForm.addEventListener('submit', setNewProfileInfo);