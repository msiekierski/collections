export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const COLLECTION_MANAGER_ROUTE = "/collections/user/:email";
export const getCollectionManagerRoute = (email) =>
  `/collections/user/${email}`;

export const ITEMS_MANAGER_ROUTE = `${COLLECTION_MANAGER_ROUTE}/collection/:collectionId`;
export const getItemsManagerRoute = (email, collectionId) =>
  `${getCollectionManagerRoute(email)}/collection/${collectionId}`;
export const COLLECTION_ROUTE = "/collection/:collectionId";
export const getCollectionPageRoute = (collectionId) =>
  `/collection/${collectionId}`;
export const ITEM_ROUTE = "/item/:itemId";
export const getItemPageRoute = (itemId) => `/item/${itemId}`;
export const ADMIN_ROUTE = "/admin";
export const TAG_SEARCH_ROUTE = "/search/tag/:tag";
export const getTagSearchRoute = (tag) => `/search/tag/${tag}`;
