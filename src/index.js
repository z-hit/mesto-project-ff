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
const popupImage = document.querySelector(".popup_type_image");

// @todo: Функция создания карточки

const createNewCard = function (card, deleteCardFunc) {
  const newCard = cardTemplate.cloneNode(true);
  const deleteButton = newCard.querySelector(".card__delete-button");

  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__image").alt = card.name;
  newCard.querySelector(".card__title").textContent = card.name;

  deleteButton.addEventListener("click", deleteCardFunc);

  return newCard;
};

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

// @todo: popups

function openPopup(popup) {
  popup.classList.add("popup_is-opened");

  popup.addEventListener("click", handleCrossClick);
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", (evt) => {
    handleEscClick(evt, popup);
  });

  console.log("open popup works");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  popup.removeEventListener("click", handleCrossClick);
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", (evt) => handleEscClick(evt, popup));
}

function handleCrossClick(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest(".popup_is-opened"));

    console.log("cross click works");
  }
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target.closest(".popup_is-opened"));

    console.log("overlay click works");
  }
}

function handleEscClick(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
  console.log(evt.key);
}

function handleImageClick(evt) {
  if (evt.target.classList.contains("card__image")) {
    openPopup(popupImage);
  }
}

placesList.addEventListener("click", (evt) => handleImageClick(evt));
editButton.addEventListener("click", () => openPopup(popupEdit));
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));
