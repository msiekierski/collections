export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const COLLECTION_MANAGER_ROUTE = "/collections/user/:email";
export const getCollectionManagerRoute = (email) =>
  `/collections/user/${email}`;

export const ITEMS_MANAGER_ROUTE = `${COLLECTION_MANAGER_ROUTE}/collection/:collectionId`;
export const getItemsManagerRoute = (email, collectionId) =>
  `${getCollectionManagerRoute(email)}/collection/${collectionId}`;
