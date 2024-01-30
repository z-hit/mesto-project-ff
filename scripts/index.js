// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

const createNewCard = function (card, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  deleteButton.addEventListener("click", deleteCard);

  placesList.append(cardElement);
};

// @todo: Функция удаления карточки
const deleteCard = function (card) {
  return placesList.remove(card);
};

// @todo: Вывести карточки на страницу
const addCards = function () {
  for (let i = 0; i < initialCards.length; i++) {
    let card = initialCards[i];
    createNewCard(card);
  }
};

addCards();
