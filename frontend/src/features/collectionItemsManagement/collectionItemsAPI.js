import axios from "axios";
import {
  createCollectionItemUrl,
  getCollectionByIdUrl,
  GET_UNIQUE_TAGS,
  REMOVE_ITEMS_BY_IDS,
} from "../../common/constants/apiUrls";

export function fetchCollectionById(collectionId) {
  return axios.get(getCollectionByIdUrl(collectionId));
}

export function fetchUniqueTags() {
  return axios.get(GET_UNIQUE_TAGS);
}

export function createNewItem(newItem) {
  return axios.post(createCollectionItemUrl(), newItem);
}

export function removeItems(ids) {
  return axios.delete(REMOVE_ITEMS_BY_IDS, { data: { ids } });
}
