function openModal(e, closeModalFunc) {
  e.classList.add("popup_is-opened");

  e.addEventListener("click", closeModalFunc);
  document.addEventListener("keydown", closeModalFunc);
}

function closeModal(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");

  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup") ||
    evt.key === "Escape" ||
    evt.type === "submit"
  ) {
    openedPopup.classList.remove("popup_is-opened");
    openedPopup.querySelectorAll(".popup__input").forEach((input) => {
      input.value = "";
    });
    document.removeEventListener("keydown", closeModal);
  }
}

export { openModal, closeModal };
