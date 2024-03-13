import "./index.css";
//import { initialCards } from "./components/cards.js";
import { createNewCard, deleteCard } from "./components/card";
import {
  openModal,
  closeModal,
  handleOverlayClick,
} from "./components/modal.js";
import { enableValidation, hideInputError } from "./components/validation.js";
import { _ } from "core-js";

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
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupNewCard = popupNewCard.querySelector(".popup__close");
const formNewCard = document.querySelector(".popup_type_new-card .popup__form");
const inputNewCardImage = formNewCard.querySelector(".popup__input_type_url");
const inputNewCardName = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupImage = document.querySelector(".popup_type_image");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const serverUrl = "https://nomoreparties.co/v1/wff-cohort-8/";
const token = "3a178645-c470-4f48-a274-38f177eede82";

//SERVER

function getUserData() {
  return fetch(serverUrl + "users/me", {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.style.backgroundImage = "url('" + result.avatar + "')";
    });
}

getUserData();

function getInitialCards() {
  return fetch(serverUrl + "cards", {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return addCards(result);
    });
}

getInitialCards();

function addCards(cardsList) {
  cardsList.forEach((card) => {
    placesList.append(createNewCard(card, deleteCard, handleImageClick));
  });
}

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

  profileTitle.textContent = inputProfileEditName.value;
  profileDescription.textContent = inputProfileEditDescription.value;

  closeModal(popupEdit);
}

function addNewCardByUser(evt) {
  evt.preventDefault();

  const newCardData = {};
  newCardData.link = inputNewCardImage.value;
  newCardData.name = inputNewCardName.value;

  placesList.prepend(createNewCard(newCardData, deleteCard, handleImageClick));
  closeModal(popupNewCard);
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);

  inputList.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });
}

enableValidation(validationConfig);

export { cardTemplate, handleImageClick };
