const base = process.env.REACT_APP_API_ADDRESS;

export const CREATE_USER_URL = base + "/user";
export const LOGIN_USER_URL = base + "/user/logIn";
export const COLLECTION_TOPICS_URL = base + "/collectionTopics";

export const getCollectionCreationUrl = (userId) =>
  `${base}/collection/user/${userId}`;

export const getUserByEmailUrl = (email) => `${base}/user/email/${email}`;

export const getCollectionsByUserIdUrl = (userId) =>
  `${base}/collection/user/${userId}`;

export const deleteCollectionByIdUrl = (collectionId) =>
  `${base}/collection/${collectionId}`;

export const getCollectionByIdUrl = (collectionId) =>
  `${base}/collection/${collectionId}`;

export const GET_UNIQUE_TAGS = base + "/item/tags";

export const createCollectionItemUrl = () => `${base}/item`;
export const REMOVE_ITEMS_BY_IDS = base + "/item";
