import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import Api from '../components/Api';

import {
  validateObj,
  elementTemplate,
  elements,
  profileAddButton,
  profileEditButton,
  profileAvatarEditButton,
  profileName,
  profileProfession,
  profileAvatar,
  popupTypeProfile,
  popupTypeAddElement,
  popupTypeOpenImage,
  popupTypeDeleteCard,
  popupTypeUpdateAvatar
} from '../utils/constants.js'


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '8a58c246-121a-4bb6-8524-ce4dffc68c9d',
    'Content-Type': 'application/json'
  }
});


const userInfo = new UserInfo({ profileName, profileProfession, profileAvatar });

const imagePopup = new PopupWithImage(popupTypeOpenImage);

const profilePopup = new PopupWithForm(popupTypeProfile, (valueData) => {
  profilePopup.renderLoading(true);
  api.updateUserInfo({ name: valueData.popupProfileInput, about: valueData.professionInput })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      profileValidation.editButtonState();
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
});

const addElementPopup = new PopupWithForm(popupTypeAddElement, (valueData) => {
  addElementPopup.renderLoading(true);
  api.addNewCard({ name: valueData.popupNameInput, link: valueData.urlInput })
    .then((res) => {
      defaultCardList.addItem(createElement(res));
      newCardValidation.editButtonState();
      addElementPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addElementPopup.renderLoading(false);
    });
});

const deleteCardPopup = new PopupWithDeleteCard(popupTypeDeleteCard, (card) => {
  api.deleteCard(card.getCardId())
    .then(() => {
      card.remove();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

const updateAvatarPopup = new PopupWithForm(popupTypeUpdateAvatar, (valueData) => {
  updateAvatarPopup.renderLoading(true);
  api.updateUserAvatar({ avatar: valueData.avatarUrlInput })
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      updateAvatarValidation.editButtonState();
      updateAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateAvatarPopup.renderLoading(false);
    });

});

const profileValidation = new FormValidator(profilePopup.getForm(), validateObj);
const newCardValidation = new FormValidator(addElementPopup.getForm(), validateObj);
const updateAvatarValidation = new FormValidator(updateAvatarPopup.getForm(), validateObj);;

api.getBaseData()
  .then((res) => {
    const [cards, user] = res;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setUserAvatar(user.avatar);
    userInfo.setCurrentUserId(user._id);
    defaultCardList.renderItems(cards.reverse());
  }).catch((err) => {
    console.error(err);
  });


const defaultCardList = new Section({
  renderer: (item) => {
    const cardElement = createElement(item);
    defaultCardList.addItem(cardElement);
  }
}, elements);

profilePopup.setEventListeners();
addElementPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
updateAvatarPopup.setEventListeners();

profileValidation.enableValidation();
newCardValidation.enableValidation();
updateAvatarValidation.enableValidation();


function createElement(item) {
  const elem = new Card(item, userInfo.getCurrentUserId(),
    () => {
      imagePopup.open(item.name, item.link);
    },
    () => {
      deleteCardPopup.setCard(elem);
      deleteCardPopup.open();
    },
    () => {
      if (elem.hasLike()) {
        api.dislikeCard(elem.getCardId())
          .then((res) => {
            elem.dislike();
            elem.updateLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          })
      }
      else {
        api.likeCard(elem.getCardId())
          .then((res) => {
            elem.like();
            elem.updateLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    elementTemplate);
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
profileAvatarEditButton.addEventListener('click', function () {
  updateAvatarValidation.resetInputErrors();
  updateAvatarValidation.editButtonState();
  updateAvatarPopup.open();
});

profileAddButton.addEventListener('click', function () {
  newCardValidation.resetInputErrors();
  newCardValidation.editButtonState();
  addElementPopup.open();
});