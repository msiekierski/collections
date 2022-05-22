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

export const getLatestItemsUrl = (topNumber) =>
  `${base}/item/latest/${topNumber}`;

export const getLargestCollectionsUrl = (topNumber) =>
  `${base}/collection/largest/${topNumber}`;

export const getItemByIdUrl = (itemId) => `${base}/item/${itemId}`;
export const createNewCommentUrl = (itemId) => `${base}/comment/item/${itemId}`;
export const getCommentsByItemId = (itemId) => `${base}/comment/item/${itemId}`;
export const setCommentVoteUrl = (userId, commentId) =>
  `${base}/commentLike/user/${userId}/comment/${commentId}`;
export const removeCommentVoteUrl = (userId, commentId) =>
  `${base}/commentLike/user/${userId}/comment/${commentId}`;

export const GET_TAGS_WITH_COUNT_URL = `${base}/item/tags/count`;

export const updateUserUrl = (userId) => `${base}/user/id/${userId}`;
export const deleteUserUrl = (userId) => `${base}/user/id/${userId}`;
export const GET_USERS_URL = `${base}/user`;
export const getSearchResult = (text) => `${base}/search/${text}`;
