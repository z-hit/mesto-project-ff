import "./index.css";
import { initialCards } from "./components/cards.js";
import { createNewCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");
const buttonOpenPopupEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formEditProfile = document.querySelector(".popup_type_edit .popup__form");
const inputProfileEditName = formEditProfile.querySelector(
  ".popup__input_type_name"
);
const inputProfileEditDescription = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const buttonOpenPopupNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.querySelector(".popup_type_new-card .popup__form");
const inputNewCardImage = formNewCard.querySelector(".popup__input_type_url");
const inputNewCardName = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const popupImage = document.querySelector(".popup_type_image");
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

function addCards(cardsList) {
  cardsList.forEach((card) => {
    placesList.append(createNewCard(card, deleteCard, handleImageClick));
  });
}
addCards(initialCards);

buttonOpenPopupEdit.addEventListener("click", () => {
  inputProfileEditName.value = profileTitle.textContent;
  inputProfileEditDescription.value = profileDescription.textContent;
  openModal(popupEdit);
});
buttonOpenPopupNewCard.addEventListener("click", () => {
  clearInputs(popupNewCard);
  openModal(popupNewCard);
});
formEditProfile.addEventListener("submit", updateProfileInfo);
formNewCard.addEventListener("submit", addNewCardByUser);

function clearInputs(e) {
  e.querySelectorAll(".popup__input").forEach((input) => {
    input.value = "";
  });
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

export { cardTemplate, handleImageClick };
