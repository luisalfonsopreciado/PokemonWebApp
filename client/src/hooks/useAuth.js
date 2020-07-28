import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Redirect } from "react-router";

const useAuth = () => {
  const { user, setUser } = useContext(UserContext);

  const redirect = (path = "/login") => {
    return !user ? <Redirect to={path} /> : null;
  };

  return { user, setUser, redirect, token: user ? user.token : "" };
};

export default useAuth;
