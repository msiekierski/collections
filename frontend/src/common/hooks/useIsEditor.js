import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { ADMIN, REGULAR } from "../constants/authStates";
import useAuth from "./useAuth";

const useIsEditor = (email) => {
  const role = useAuth();
  const [isEditor, setIsEditor] = useState(false);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (role === ADMIN || (role === REGULAR && user.email === email)) {
      setIsEditor(true);
    } else {
      setIsEditor(false);
    }
  }, [role, isEditor, email]);

  return isEditor;
};

export default useIsEditor;
