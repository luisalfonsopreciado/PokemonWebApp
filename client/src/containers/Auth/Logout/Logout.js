import React, { useContext, useCallback } from "react";
import { useEffect } from "react";
import useRequest from "../../../hooks/useRequest";
import { UserContext } from "../../../context/userContext";
import { logout } from "../../../context/userActions";

const Logout = ({ history }) => {
  const { setUser } = useContext(UserContext);

  const { doRequest } = useCallback(useRequest({
    url: process.env.REACT_APP_AUTH_SRV_URL + "/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      logout(setUser);
      history.push("/");
    },
  }), [])

  useEffect(() => {
    doRequest();
    setUser(null);
  }, [doRequest, setUser]);

  return <div>Signing you out...</div>;
};

export default Logout;
