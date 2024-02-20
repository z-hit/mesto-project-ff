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
  const popupImage = document.querySelector(".popup_type_image");

  newCard.querySelector(".card__image").src = card.link;
  newCard.querySelector(".card__image").alt = card.name;
  newCard.querySelector(".card__title").textContent = card.name;
  newCard
    .querySelector(".card__image")
    .addEventListener("click", openPopup(popupImage));

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
  popup.classList.toggle("popup_is-opened");
  popup.addEventListener("click", handleCrossClick);
  // popup.addEventListener("click", handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.toggle("popup_is-opened");
}

function handleCrossClick(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.closest(".popup_is-opened"));
    console.log("crocc clikc works");
  }
}

// OVERLAY CLICK ...
/* function handleOverlayClick(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (!openedPopup.contains(evt.target)) {
    closePopup(openedPopup);
    console.log(openedPopup);
    console.log(evt.target);
  }
} */

editButton.addEventListener("click", () => openPopup(popupEdit));
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));
