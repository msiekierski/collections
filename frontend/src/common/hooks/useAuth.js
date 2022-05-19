import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { ADMIN, GUEST, REGULAR } from "../constants/authStates";

const matchRole = (user) => {
  if (user === null) {
    return GUEST;
  }
  const { isAdmin } = user;
  if (isAdmin) {
    return ADMIN;
  } else {
    return REGULAR;
  }
};

const useAuth = () => {
  const { user } = useSelector(selectUser);
  const [role, setRole] = useState(matchRole(user));

  useEffect(() => {
    setRole(matchRole(user));
  }, [user]);

  return role;
};

export default useAuth;
