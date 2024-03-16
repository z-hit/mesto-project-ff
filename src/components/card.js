import { cardTemplate, popupConfirmDeleteCard } from "../index";
import { openModal } from "./modal";

const createNewCard = function (
  cardData,
  userProfileData,
  deleteCardFunc,
  handleImageClickFunc
) {
  const newCard = cardTemplate.cloneNode(true);
  const newCardBody = newCard.querySelector(".card");
  const buttonDeleteCard = newCard.querySelector(".card__delete-button");
  const buttonLike = newCard.querySelector(".card__like-button");
  const buttonImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const likeCounter = newCard.querySelector(".card__like-counter");

  buttonImage.src = cardData.link;
  buttonImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  newCardBody.setAttribute("id", cardData._id);

  if (cardData.owner._id !== userProfileData.id) {
    buttonDeleteCard.style.display = "none";
  } else {
    buttonDeleteCard.addEventListener("click", deleteCardFunc);
  }

  buttonLike.addEventListener("click", handleLikeClick);
  buttonImage.addEventListener("click", () =>
    handleImageClickFunc(buttonImage.src, cardTitle.textContent)
  );

  return newCard;
};

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function confirmDeleteCard(cardID) {
  
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest(".card");
  //cardToDelete.remove();
  openModal(popupConfirmDeleteCard);

  console.log(cardToDelete);
  console.log(cardToDelete.id);
}

export { createNewCard, deleteCard };
