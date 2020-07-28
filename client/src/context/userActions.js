import axios from "axios";
import { createHTTPHeaders } from "../shared/utility";

export const login = (setUser, token, user) => {
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
  localStorage.setItem("token", token);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("expirationDate", expirationDate);
  setUser({ token, userId: user.id, expirationDate, data: user });
};

export const logout = (setUser) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  setUser(null);
};

export const refresh = async (setUser) => {
  const token = localStorage.getItem("token");
  if (!token) return logout(setUser);

  const expirationDate = new Date(localStorage.getItem("expirationDate"));

  if (expirationDate <= new Date()) return logout(setUser);

  const { currentUser } = await getUserCredentials(token);

  setUser({
    token,
    userId: currentUser.id,
    expirationDate,
    data: currentUser,
  });
};

export const getUserCredentials = async (token) => {
  const config = createHTTPHeaders(token);

  const res = await axios.get(
    process.env.REACT_APP_AUTH_SRV_URL + "/currentUser",
    config
  );
  return res.data;
};
