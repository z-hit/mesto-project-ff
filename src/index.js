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
    handleEscDown(evt, popup);
  });

  console.log("open popup works");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", (evt) => handleEscDown(evt, popup));

  nameInput.value = "";
  jobInput.value = "";
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

function handleEscDown(evt, popup) {
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

// EDIT PROFILE FORM

// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit .popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closePopup(evt.target.closest(".popup_is-opened"));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
