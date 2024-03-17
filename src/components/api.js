const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-8/",
  headers: {
    authorization: "3a178645-c470-4f48-a274-38f177eede82",
    "Content-Type": "application/json",
  },
};

function fetchServer(url, method, body) {
  return fetch(url, {
    method: method,
    headers: apiConfig.headers,
    body: body,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
}

function getUserData() {
  return fetchServer(`${apiConfig.baseURL}users/me`, "GET");
}

function getInitialCards() {
  return fetchServer(`${apiConfig.baseURL}cards`, "GET");
}

function addNewCardToServer(newCardData) {
  return fetchServer(
    `${apiConfig.baseURL}cards`,
    "POST",
    JSON.stringify(newCardData)
  );
}

function patchProfileInfo(newUserData) {
  return fetchServer(
    `${apiConfig.baseURL}users/me`,
    "PATCH",
    JSON.stringify(newUserData)
  );
}

function patchAvatar(newAvatarLink) {
  return fetchServer(
    `${apiConfig.baseURL}users/me/avatar`,
    "PATCH",
    JSON.stringify(newAvatarLink)
  );
}

function deleteCardFromServer(cardToDelete) {
  return fetchServer(`${apiConfig.baseURL}cards/${cardToDelete.id}`, "DELETE");
}

function putLikeToServer(cardID) {
  return fetchServer(`${apiConfig.baseURL}cards/likes/${cardID}`, "PUT");
}

function removeLikeFromServer(cardID) {
  return fetchServer(`${apiConfig.baseURL}cards/likes/${cardID}`, "DELETE");
}

export {
  getUserData,
  getInitialCards,
  patchProfileInfo,
  patchAvatar,
  deleteCardFromServer,
  putLikeToServer,
  removeLikeFromServer,
  addNewCardToServer,
};
