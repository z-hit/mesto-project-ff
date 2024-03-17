import "./index.css";
import { createNewCard } from "./components/card";
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
const popupConfirmDeleteCard = document.querySelector(
  ".popup_type_confirm-delete-card"
);
const buttonClosePopupConfirmDeleteCard =
  popupConfirmDeleteCard.querySelector(".popup__close");
const buttonConfirmDeleteCard =
  popupConfirmDeleteCard.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const baseUrl = "https://nomoreparties.co/v1/wff-cohort-8/";
const token = "3a178645-c470-4f48-a274-38f177eede82";
const userProfileData = {
  name: "",
  about: "",
  avatar: "",
  id: "",
};
let idCardToDelete = "";

function handlePromiseResolve(response) {
  if (response.ok) {
    return response.json();
  }
  return response.status;
}

function getUserData() {
  return fetch(baseUrl + "users/me", {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then((res) => handlePromiseResolve(res));
}

function getCardsData() {
  return fetch(baseUrl + "cards", {
    method: "GET",
    headers: {
      authorization: token,
    },
  }).then((res) => handlePromiseResolve(res));
}

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
    placesList.append(
      createNewCard(card, userProfileData, confrimDeleteCard, handleImageClick)
    );
  });
}

Promise.all([getUserData(), getCardsData()])
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

  return fetch(baseUrl + "users/me", {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputProfileEditName.value,
      about: inputProfileEditDescription.value,
    }),
  })
    .then((res) => handlePromiseResolve(res))
    .then((userData) => {
      createProfile(userData);
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err));
}

function addNewCardByUser(evt) {
  evt.preventDefault();

  return fetch(baseUrl + "cards", {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputNewCardName.value,
      link: inputNewCardImage.value,
    }),
  })
    .then((res) => handlePromiseResolve(res))
    .then((cardData) => {
      placesList.prepend(
        createNewCard(
          cardData,
          userProfileData,
          confrimDeleteCard,
          handleImageClick
        )
      );
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err));
}

function confrimDeleteCard(evt) {
  idCardToDelete = evt.target.closest(".card").id;
  openModal(popupConfirmDeleteCard);
}

function deleteCard() {
  const cardToDelete = document.getElementById(idCardToDelete);

  return fetch(baseUrl + "cards/" + idCardToDelete, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => handlePromiseResolve(res))
    .then(() => {
      cardToDelete.remove();
      closeModal(popupConfirmDeleteCard);
    })
    .catch((err) => console.log(err));
}

function putLike(cardID) {
  const card = document.getElementById(cardID);
  const likeCounter = card.querySelector(".card__like-counter");

  return fetch(baseUrl + "cards/likes/" + cardID, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => handlePromiseResolve(res))
    .then((updatedCardData) => {
      likeCounter.textContent = updatedCardData.likes.length;
    })
    .catch((err) => console.log(err));
}

function removeLike(cardID) {
  const card = document.getElementById(cardID);
  const likeCounter = card.querySelector(".card__like-counter");

  return fetch(baseUrl + "cards/likes/" + cardID, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => handlePromiseResolve(res))
    .then((updatedCardData) => {
      likeCounter.textContent = updatedCardData.likes.length;
    })
    .catch((err) => console.log(err));
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

export { cardTemplate, handleImageClick, putLike, removeLike };
