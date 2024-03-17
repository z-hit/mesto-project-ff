const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-8/",
  headers: {
    authorization: "3a178645-c470-4f48-a274-38f177eede82",
    "Content-Type": "application/json",
  },
};

function handlePromiseResolve(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

function getUserData() {
  return fetch(`${apiConfig.baseURL}users/me`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => handlePromiseResolve(res));
}

function getInitialCards() {
  return fetch(`${apiConfig.baseURL}cards`, {
    method: "GET",
    headers: apiConfig.headers,
  }).then((res) => handlePromiseResolve(res));
}

//abstract func test

/* function workWithServer(url, method) {
  return fetch(url, {
    method: method,
    headers: apiConfig.headers,
  }).then((res) => handlePromiseResolve(res));
} */

// test over

function addNewCardToServer(newCardData) {
  return fetch(`${apiConfig.baseURL}cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(newCardData),
  }).then((res) => handlePromiseResolve(res));
}

function patchProfileInfo(newUserData) {
  return fetch(`${apiConfig.baseURL}users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(newUserData),
  }).then((res) => handlePromiseResolve(res));
}

function patchAvatar(newAvatarLink) {
  return fetch(`${apiConfig.baseURL}users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(newAvatarLink),
  }).then((res) => handlePromiseResolve(res));
}

function deleteCardFromServer(cardToDelete) {
  return fetch(`${apiConfig.baseURL}cards/${cardToDelete.id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => handlePromiseResolve(res));
}

function putLikeToServer(cardID) {
  return fetch(`${apiConfig.baseURL}cards/likes/${cardID}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then((res) => handlePromiseResolve(res));
}

function removeLikeFromServer(cardID) {
  return fetch(`${apiConfig.baseURL}cards/likes/${cardID}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => handlePromiseResolve(res));
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
