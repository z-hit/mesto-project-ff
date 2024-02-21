function openModal(e) {
  e.classList.add("popup_is-opened");

  e.addEventListener("click", (evt) => handleCrossClick(evt, e));
  e.addEventListener("click", (evt) => handleOverlayClick(evt, e));
  document.addEventListener("keydown", (evt) => handleEscDown(evt, e));
}

function closeModal(e) {
  e.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscDown);
  clearPopupInputs(e);
}

function handleCrossClick(evt, e) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(e);
  }
}

function handleOverlayClick(evt, e) {
  if (evt.target.classList.contains("popup")) {
    closeModal(e);
  }
}

function handleEscDown(evt, e) {
  if (evt.key === "Escape") {
    closeModal(e);
  }
}

function clearPopupInputs(e) {
  e.querySelectorAll(".popup__input").forEach((input) => {
    input.value = "";
  });
}
