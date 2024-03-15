import { cardTemplate, popupConfirmDeleteCard } from "../index";
import { openModal } from "./modal";

const createNewCard = function (
  card,
  userProfileData,
  deleteCardFunc,
  handleImageClickFunc
) {
  const newCard = cardTemplate.cloneNode(true);
  const buttonDeleteCard = newCard.querySelector(".card__delete-button");
  const buttonLike = newCard.querySelector(".card__like-button");
  const buttonImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const likeCounter = newCard.querySelector(".card__like-counter");

  buttonImage.src = card.link;
  buttonImage.alt = card.name;
  cardTitle.textContent = card.name;

  if (card.likes) {
    likeCounter.textContent = card.likes.length;
  } else {
    likeCounter.textContent = 0;
  }

  if (card.owner && card.owner._id !== userProfileData.id) {
    buttonDeleteCard.style.display = "none";
  } else {
    buttonDeleteCard.addEventListener("click", deleteCardFunc);
  }

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
  /* const cardToDelete = evt.target.closest(".places__item");
  cardToDelete.remove(); */
  openModal(popupConfirmDeleteCard);
  console.log(evt);
}

export { createNewCard, deleteCard };
