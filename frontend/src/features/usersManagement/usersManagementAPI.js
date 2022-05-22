import axios from "axios";
import {
  GET_USERS_URL,
  updateUserUrl,
  deleteUserUrl,
} from "../../common/constants/apiUrls";

export function fetchUsers() {
  const usersPromise = axios.get(GET_USERS_URL);
  return usersPromise;
}

export function updateUser(userId, values) {
  return axios.put(updateUserUrl(userId), { ...values });
}

export function deleteUser(userId) {
  return axios.delete(deleteUserUrl(userId));
}
