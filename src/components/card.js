import { cardTemplate } from "../index";

function createNewCard(cardData, userID, cardHandlersConfig) {
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

  if (cardData.owner._id !== userID) {
    buttonDeleteCard.style.display = "none";
  } else {
    buttonDeleteCard.addEventListener("click", () =>
      cardHandlersConfig.handleDeleteCard(newCardBody)
    );
  }

  if (
    cardData.likes.length > 0 &&
    cardData.likes.some((user) => user._id === userID)
  ) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", () =>
    cardHandlersConfig.handleLike(newCardBody)
  );
  buttonImage.addEventListener("click", () =>
    cardHandlersConfig.handleImageOpen(buttonImage.src, cardTitle.textContent)
  );
  return newCard;
}

function isLiked(card) {
  if (
    card
      .querySelector(".card__like-button")
      .classList.contains("card__like-button_is-active")
  ) {
    return true;
  }
  return false;
}

function updateLikesInCard(card, cardData) {
  const likeCounter = card.querySelector(".card__like-counter");
  const buttonLike = card.querySelector(".card__like-button");
  likeCounter.textContent = cardData.likes.length;
  buttonLike.classList.toggle("card__like-button_is-active");
}

export { createNewCard, isLiked, updateLikesInCard };
