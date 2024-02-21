import "./index.css";
import { initialCards } from "./scripts/cards.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

// @todo: Функция создания карточки

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

function handleImageClick(evt) {
  const clickedCard = evt.target.closest(".card");
  const imageUrl = clickedCard.querySelector(".card__image").src;
  const caption = clickedCard.querySelector(".card__title").textContent;

  const clickedCardData = {};
  clickedCardData.imageUrl = imageUrl;
  clickedCardData.caption = caption;

  openPopup(createImagePopup(clickedCardData));
}

function createImagePopup(clickedCardData) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");

  imagePopupImage.src = clickedCardData.imageUrl;
  imagePopupImage.alt = clickedCardData.caption;
  imagePopupCaption.textContent = clickedCardData.caption;

  return imagePopup;
}

//@todo: Like functionality

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
const deleteCard = (event) => {
  const cardToDelete = event.target.closest(".places__item");
  cardToDelete.remove();
};

// @todo: Вывести карточки на страницу
const addCards = (cardsList) => {
  cardsList.forEach((card) => {
    placesList.append(createNewCard(card, deleteCard));
  });
};

addCards(initialCards);

// @todo: open and close popups

function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  popup.addEventListener("click", (evt) => handleCrossClick(evt, popup));
  popup.addEventListener("click", (evt) => handleOverlayClick(evt, popup));
  document.addEventListener("keydown", (evt) => {
    handleEscDown(evt, popup);
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", (evt) => handleEscDown(evt, popup));

  clearPopupInputs(popup);
}

function clearPopupInputs(popup) {
  popup.querySelectorAll(".popup__input").forEach((input) => {
    input.value = "";
  });
}

function handleCrossClick(evt, popup) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(popup);
  }
}

function handleOverlayClick(evt, popup) {
  if (evt.target.classList.contains("popup")) {
    closePopup(popup);
  }
}

function handleEscDown(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

editButton.addEventListener("click", () => openPopup(popupEdit));
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

// @todo: Edit profile info

const formElement = document.querySelector(".popup_type_edit .popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const openedPopup = evt.target.closest(".popup_is-opened");

  const name = nameInput.value;
  const job = jobInput.value;

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closePopup(openedPopup);
}

formElement.addEventListener("submit", handleFormSubmit);

// @todo: Add new card by user

const cardElement = document.querySelector(".popup_type_new-card .popup__form");
const newCardNameInput = cardElement.querySelector(".popup__input_type_url");
const newCardImageUrlInput = cardElement.querySelector(
  ".popup__input_type_card-name"
);

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const openedPopup = evt.target.closest(".popup_is-opened");
  const newCard = {};
  newCard.link = newCardNameInput.value;
  newCard.name = newCardImageUrlInput.value;

  placesList.prepend(createNewCard(newCard, deleteCard));
  closePopup(openedPopup);
}

cardElement.addEventListener("submit", handleNewCardSubmit);
