import { cardTemplate } from "../index";

const createNewCard = function (card, deleteCardFunc, handleImageClickFunc) {
  const newCard = cardTemplate.cloneNode(true);
  const buttonDeleteCard = newCard.querySelector(".card__delete-button");
  const buttonLike = newCard.querySelector(".card__like-button");
  const buttonImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");

  buttonImage.src = card.link;
  buttonImage.alt = card.name;
  cardTitle.textContent = card.name;

  buttonDeleteCard.addEventListener("click", deleteCardFunc);
  buttonLike.addEventListener("click", handleLikeClick);
  buttonImage.addEventListener("click", () =>
    handleImageClickFunc(card.link, card.name)
  );

  return newCard;
};

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".places__item");
  cardToDelete.remove();
}

export { createNewCard, deleteCard };
