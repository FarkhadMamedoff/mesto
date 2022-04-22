import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
  initialCards,
  validateObj,
  elementTemplate,
  elements,
  profileAddButton,
  profileEditButton,
  profileName,
  profileProfession,
  popupTypeProfile,
  popupTypeAddElement,
  popupTypeOpenImage
} from '../utils/constants.js'

const userInfo = new UserInfo({ profileName, profileProfession });

const imagePopup = new PopupWithImage(popupTypeOpenImage);
const profilePopup = new PopupWithForm(popupTypeProfile, (valueData) => {
  userInfo.setUserInfo(valueData.popupProfileInput, valueData.professionInput);
  profilePopup.close();
});

const addElementPopup = new PopupWithForm(popupTypeAddElement, (valueData) => {
  elements.prepend(createElement({ name: valueData.popupNameInput, link:valueData.urlInput }));
  newCardValidation.editButtonState();
  addElementPopup.close();
});

const profileValidation = new FormValidator(profilePopup.getForm(), validateObj);
const newCardValidation = new FormValidator(addElementPopup.getForm(), validateObj);

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createElement(item);
    defaultCardList.addItem(cardElement);
  }
}, elements);


profilePopup.setEventListeners();
addElementPopup.setEventListeners();
imagePopup.setEventListeners();

profileValidation.enableValidation();
newCardValidation.enableValidation();

defaultCardList.renderItems();



function createElement(item) {
  const elem = new Card(item, () => {
    imagePopup.open(item.name, item.link);
  }, elementTemplate);
  return elem.createCard();
}


function openProfilePopup() {
  const userInfoContent = userInfo.getUserInfo();
  const profileForm = profilePopup.getForm();
  profileForm.elements.popupProfileInput.value = userInfoContent.profileName;
  profileForm.elements.professionInput.value = userInfoContent.profileProfession;
  profileValidation.resetInputErrors();
  profileValidation.editButtonState();
  profilePopup.open();

}



profileEditButton.addEventListener('click', openProfilePopup);

profileAddButton.addEventListener('click', function () {
  newCardValidation.resetInputErrors();
  addElementPopup.open();
});





