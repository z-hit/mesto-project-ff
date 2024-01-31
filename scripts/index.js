// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

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
