import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const HomePage = () => {
  const { user } = useSelector(selectUser);

  return <div>Home</div>;
};

export default HomePage;
