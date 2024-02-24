function openModal(popup) {
  document.addEventListener("keydown", handleEscDown);
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  document.removeEventListener("keydown", handleEscDown);
  popup.classList.remove("popup_is-opened");
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function handleEscDown(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal, handleOverlayClick };
