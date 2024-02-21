import "./index.css";
import { initialCards } from "./components/initialCards.js";

const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".popup_type_edit");
const profileEditForm = document.querySelector(".popup_type_edit .popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const createNewCardButton = document.querySelector(".profile__add-button");
const createNewCardModal = document.querySelector(".popup_type_new-card");
const newCardForm = document.querySelector(".popup_type_new-card .popup__form");
const imageModal = document.querySelector(".popup_type_image");

// CARD

const createNewCard = function (card, deleteCardFunc) {
  const newCard = cardTemplate.cloneNode(true);
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");
  const imageButton = newCard.querySelector(".card__image");

  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__image").alt = card.name;
  newCard.querySelector(".card__title").textContent = card.name;

  deleteButton.addEventListener("click", deleteCardFunc);
  likeButton.addEventListener("click", handleLikeButtonClick);
  imageButton.addEventListener("click", handleImageClick);

  return newCard;
};

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".places__item");
  cardToDelete.remove();
}

//MODAL

function openModal(e) {
  e.classList.add("popup_is-opened");

  e.addEventListener("click", (evt) => handleCrossClick(evt, e));
  e.addEventListener("click", (evt) => handleOverlayClick(evt, e));
  document.addEventListener("keydown", (evt) => handleEscDown(evt, e));
}

function closeModal(e) {
  e.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscDown);
  clearPopupInputs(e);
}

function handleCrossClick(evt, e) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(e);
  }
}

function handleOverlayClick(evt, e) {
  if (evt.target.classList.contains("popup")) {
    closeModal(e);
  }
}

function handleEscDown(evt, e) {
  if (evt.key === "Escape") {
    closeModal(e);
  }
}

function clearPopupInputs(e) {
  e.querySelectorAll(".popup__input").forEach((input) => {
    input.value = "";
  });
}

function addCards(cardsList) {
  cardsList.forEach((card) => {
    placesList.append(createNewCard(card, deleteCard));
  });
}

addCards(initialCards);

profileEditButton.addEventListener("click", () => openModal(profileEditModal));
createNewCardButton.addEventListener("click", () =>
  openModal(createNewCardModal)
);
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);

function handleImageClick(evt) {
  const clickedCard = evt.target.closest(".card");
  const clickedCardImage = clickedCard.querySelector(".card__image");
  const clickedCardCaption = clickedCard.querySelector(".card__title");

  const imageModalImage = imageModal.querySelector(".popup__image");
  const imageModalCaption = imageModal.querySelector(".popup__caption");

  imageModalImage.src = clickedCardImage.src;
  imageModalCaption.textContent = clickedCardCaption.textContent;
  imageModalImage.alt = clickedCardCaption.textContent;

  openModal(imageModal);
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const profileEditNameInput = profileEditForm.querySelector(
    ".popup__input_type_name"
  );
  const profileEditDescriptionInput = profileEditForm.querySelector(
    ".popup__input_type_description"
  );

  profileTitle.textContent = profileEditNameInput.value;
  profileDescription.textContent = profileEditDescriptionInput.value;

  closeModal(evt.target.closest(".popup_is-opened"));
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newCardImageInput = newCardForm.querySelector(".popup__input_type_url");
  const newCardNameInput = newCardForm.querySelector(
    ".popup__input_type_card-name"
  );

  const newCard = {};
  newCard.link = newCardImageInput.value;
  newCard.name = newCardNameInput.value;

  placesList.prepend(createNewCard(newCard, deleteCard));

  closeModal(evt.target.closest(".popup_is-opened"));
}
