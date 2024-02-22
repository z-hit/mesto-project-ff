import { cardTemplate, handleImageClick } from "../index";

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

export { createNewCard, deleteCard };
