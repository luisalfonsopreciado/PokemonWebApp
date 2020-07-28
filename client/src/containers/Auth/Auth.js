import React, { useState, useContext } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import useRequest from "../../hooks/useRequest";
import Input from "../../components/UI/Input/Input";
import { emailConfig, passwordConfig } from "./config";
import { UserContext } from "../../context/userContext";
import { login } from "../../context/userActions";

const Auth = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const { doRequest, errors } = useRequest({
    url: process.env.REACT_APP_AUTH_SRV_URL + "/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: (res) => {
      const { token, user } = res;
      login(setUser, token, user);
      history.push("/");
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    doRequest();
  };

  const switchAuthModeHandler = () => {
    history.push("/signup");
  };

  return (
    <div className={classes.MainContainer}>
      <div className={classes.Container}>
        <h2>Login</h2>
        {errors}

        <form onSubmit={submitHandler}>
          <Input
            key={"email"}
            elementType={emailConfig.elementType}
            elementConfig={emailConfig.elementConfig}
            invalid={emailConfig.valid}
            shouldValidate={emailConfig.validation}
            value={email}
            touched={emailConfig.touched}
            label={emailConfig.label}
            changed={(e) => setEmail(e.target.value)}
          />
          <Input
            key={"password"}
            elementType={passwordConfig.elementType}
            elementConfig={passwordConfig.elementConfig}
            invalid={passwordConfig.valid}
            shouldValidate={passwordConfig.validation}
            value={password}
            touched={passwordConfig.touched}
            label={passwordConfig.label}
            changed={(e) => setPassword(e.target.value)}
          />
          <Button btnType="Info"> Submit </Button>
          <Button btnType="Info" clicked={switchAuthModeHandler}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
