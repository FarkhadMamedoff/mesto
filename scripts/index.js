let profileEditButton = document.querySelector('.profile__button_type_edit');
let popupCloseButton = document.querySelector('.popup__button_type_close');
let popupSubmitButton = document.querySelector('.popup__button_type_submit');

let profileName = document.querySelector('.profile__title');
let profileProfession = document.querySelector('.profile__subtitle');

let popupName = document.querySelector('.popup__input_type_name');
let popupProfession = document.querySelector('.popup__input_type_profession');

let popup = document.querySelector('.popup');


function getProfileInfo() {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;

  popup.classList.add('popup_is-opened');
}


function setNewProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;

  popup.classList.remove('popup_is-opened');
}


profileEditButton.addEventListener('click', getProfileInfo);
popupCloseButton.addEventListener('click', () => {
        popup.classList.remove('popup_is-opened');
});
popupSubmitButton.addEventListener('click', setNewProfileInfo)