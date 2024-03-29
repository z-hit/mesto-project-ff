import "./index.css";
import { createNewCard, isLiked, updateLikesInCard } from "./components/card";
import {
  openModal,
  closeModal,
  handleOverlayClick,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserData,
  getInitialCards,
  patchProfileInfo,
  patchAvatar,
  deleteCardFromServer,
  putLikeToServer,
  removeLikeFromServer,
  addNewCardToServer,
} from "./components//api.js";

const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");
const buttonOpenPopupEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const buttonClosePopupEdit = popupEdit.querySelector(".popup__close");
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const inputProfileEditName = formEditProfile.querySelector(
  ".popup__input_type_name"
);
const inputProfileEditDescription = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const buttonProfileEditSubmit = popupEdit.querySelector(".button");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupNewCard = popupNewCard.querySelector(".popup__close");
const formNewCard = document.querySelector(".popup_type_new-card .popup__form");
const inputNewCardImage = formNewCard.querySelector(".popup__input_type_url");
const inputNewCardName = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const buttonNewCardSubmit = popupNewCard.querySelector(".button");
const popupImage = document.querySelector(".popup_type_image");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupConfirmDeleteCard = document.querySelector(
  ".popup_type_confirm-delete-card"
);
const buttonClosePopupConfirmDeleteCard =
  popupConfirmDeleteCard.querySelector(".popup__close");
const buttonConfirmDeleteCard =
  popupConfirmDeleteCard.querySelector(".popup__button");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const buttonClosePopupNewAvatar = popupNewAvatar.querySelector(".popup__close");
const inputNewAvatarUrl = popupNewAvatar.querySelector(
  ".popup__input_type_url"
);
const buttonPopupNewAvatar = popupNewAvatar.querySelector(".button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardHandlers = {
  handleDeleteCard: confrimDeleteCard,
  handleLike: handleLikeClick,
  handleImageOpen: handleImageClick,
};

const userProfileData = {
  name: "",
  about: "",
  avatar: "",
  id: "",
};

let cardToDelete = "";

function createProfile(userData) {
  userProfileData.name = userData.name;
  userProfileData.about = userData.about;
  userProfileData.avatar = "url('" + userData.avatar + "')";
  userProfileData.id = userData._id;

  profileTitle.textContent = userProfileData.name;
  profileDescription.textContent = userProfileData.about;
  profileAvatar.style.backgroundImage = userProfileData.avatar;
}

function addCards(cardsList) {
  cardsList.forEach((card) => {
    placesList.append(createNewCard(card, userProfileData.id, cardHandlers));
  });
}

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cardsData]) => {
    createProfile(userData);
    addCards(cardsData);
  })
  .catch((err) => console.log(err));

function clearInputs(popup) {
  popup.querySelectorAll(".popup__input").forEach((input) => {
    input.value = "";
  });
}

function handleCrossClick(popup) {
  closeModal(popup);
}

function handleImageClick(cardImage, cardCaption) {
  popupImageImage.src = cardImage;
  popupImageCaption.textContent = cardCaption;
  popupImageImage.alt = cardCaption;

  openModal(popupImage);
}

function updateProfileInfo(evt) {
  evt.preventDefault();
  setElementTextContent(buttonProfileEditSubmit, "Сохранение...");

  patchProfileInfo({
    name: inputProfileEditName.value,
    about: inputProfileEditDescription.value,
  })
    .then((updatedUserData) => {
      createProfile(updatedUserData);
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => setElementTextContent(buttonProfileEditSubmit, "Сохранить"));
}

function updateAvatar(evt) {
  evt.preventDefault();
  setElementTextContent(buttonPopupNewAvatar, "Сохранение...");

  patchAvatar({
    avatar: inputNewAvatarUrl.value,
  })
    .then((updatedUserData) => {
      profileAvatar.style.backgroundImage =
        "url('" + updatedUserData.avatar + "')";
      closeModal(popupNewAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => setElementTextContent(buttonPopupNewAvatar, "Сохранить"));
}

function addNewCardByUser(evt) {
  evt.preventDefault();
  setElementTextContent(buttonNewCardSubmit, "Сохранение...");

  addNewCardToServer({
    name: inputNewCardName.value,
    link: inputNewCardImage.value,
  })
    .then((cardData) => {
      placesList.prepend(
        createNewCard(cardData, userProfileData.id, cardHandlers)
      );
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => setElementTextContent(buttonNewCardSubmit, "Сохранить"));
}

function confrimDeleteCard(card) {
  cardToDelete = card;
  openModal(popupConfirmDeleteCard);
}

function deleteCard() {
  setElementTextContent(buttonConfirmDeleteCard, "Удаление...");

  deleteCardFromServer(cardToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupConfirmDeleteCard);
    })
    .catch((err) => console.log(err))
    .finally(() => setElementTextContent(buttonConfirmDeleteCard, "Да"));
}

function handleLikeClick(card) {
  if (isLiked(card)) {
    removeLike(card);
  } else {
    putLike(card);
  }
}

function putLike(card) {
  putLikeToServer(card)
    .then((updatedCardData) => {
      updateLikesInCard(card, updatedCardData);
    })
    .catch((err) => console.log(err));
}

function removeLike(card) {
  removeLikeFromServer(card)
    .then((updatedCardData) => {
      updateLikesInCard(card, updatedCardData);
    })
    .catch((err) => console.log(err));
}

function setElementTextContent(element, text) {
  element.textContent = text;
}

enableValidation(validationConfig);

buttonOpenPopupEdit.addEventListener("click", () => {
  inputProfileEditName.value = profileTitle.textContent;
  inputProfileEditDescription.value = profileDescription.textContent;
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
});
buttonClosePopupEdit.addEventListener("click", () =>
  handleCrossClick(popupEdit)
);
popupEdit.addEventListener("click", handleOverlayClick);
formEditProfile.addEventListener("submit", updateProfileInfo);

buttonOpenPopupNewCard.addEventListener("click", () => {
  clearInputs(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});
buttonClosePopupNewCard.addEventListener("click", () =>
  handleCrossClick(popupNewCard)
);
popupNewCard.addEventListener("click", handleOverlayClick);
formNewCard.addEventListener("submit", addNewCardByUser);
popupImage.addEventListener("click", handleOverlayClick);
buttonClosePopupImage.addEventListener("click", () =>
  handleCrossClick(popupImage)
);
popupConfirmDeleteCard.addEventListener("click", handleOverlayClick);
buttonClosePopupConfirmDeleteCard.addEventListener("click", () =>
  handleCrossClick(popupConfirmDeleteCard)
);
buttonConfirmDeleteCard.addEventListener("click", deleteCard);
popupNewAvatar.addEventListener("click", handleOverlayClick);
buttonClosePopupNewAvatar.addEventListener("click", () =>
  handleCrossClick(popupNewAvatar)
);
popupNewAvatar.addEventListener("submit", (evt) => updateAvatar(evt));
profileAvatar.addEventListener("click", () => {
  clearInputs(popupNewAvatar);
  clearValidation(popupNewAvatar, validationConfig);
  openModal(popupNewAvatar);
});

export { cardTemplate, handleImageClick, putLike, removeLike, handleLikeClick };
