import { cardTemplate } from "../index";

function createNewCard(
  cardData,
  userProfileData,
  confirmDeleteCardFunc,
  handleLikeClickFunc,
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
    buttonDeleteCard.addEventListener("click", () =>
      confirmDeleteCardFunc(newCardBody)
    );
  }

  if (
    cardData.likes.length > 0 &&
    cardData.likes.some((user) => user._id === userProfileData.id)
  ) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", () => handleLikeClickFunc(newCardBody));
  buttonImage.addEventListener("click", () =>
    handleImageClickFunc(buttonImage.src, cardTitle.textContent)
  );
  return newCard;
}

export { createNewCard };
