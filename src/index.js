import "./index.css";
import { initialCards } from "./components/cards.js";
import { createNewCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal.js";

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

(function addCards(cardsList) {
  cardsList.forEach((card) => {
    placesList.append(createNewCard(card, deleteCard));
  });
})(initialCards);

profileEditButton.addEventListener("click", () =>
  openModal(profileEditModal, closeModal)
);
createNewCardButton.addEventListener("click", () =>
  openModal(createNewCardModal, closeModal)
);
profileEditForm.addEventListener("submit", updateProfileInfo);
newCardForm.addEventListener("submit", addNewCardByUser);

function handleImageClick(evt) {
  const clickedCard = evt.target.closest(".card");
  const clickedCardImage = clickedCard.querySelector(".card__image");
  const clickedCardCaption = clickedCard.querySelector(".card__title");

  const imageModalImage = imageModal.querySelector(".popup__image");
  const imageModalCaption = imageModal.querySelector(".popup__caption");

  imageModalImage.src = clickedCardImage.src;
  imageModalCaption.textContent = clickedCardCaption.textContent;
  imageModalImage.alt = clickedCardCaption.textContent;

  openModal(imageModal, closeModal);
}

function updateProfileInfo(evt) {
  evt.preventDefault();

  const profileEditNameInput = profileEditForm.querySelector(
    ".popup__input_type_name"
  );
  const profileEditDescriptionInput = profileEditForm.querySelector(
    ".popup__input_type_description"
  );

  profileTitle.textContent = profileEditNameInput.value;
  profileDescription.textContent = profileEditDescriptionInput.value;

  closeModal(evt);
}

function createNewCardByUser(evt) {
  const newCardImageInput = newCardForm.querySelector(".popup__input_type_url");
  const newCardNameInput = newCardForm.querySelector(
    ".popup__input_type_card-name"
  );

  const newCardData = {};
  newCardData.link = newCardImageInput.value;
  newCardData.name = newCardNameInput.value;

  const newCard = createNewCard(newCardData, deleteCard);
  closeModal(evt);

  return newCard;
}

function addNewCardByUser(evt) {
  evt.preventDefault();

  placesList.prepend(createNewCardByUser(evt));
}

export { cardTemplate, handleImageClick };
