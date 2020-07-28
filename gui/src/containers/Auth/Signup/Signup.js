import React, { useState, useContext } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "../Auth.module.css";
import Input from "../../../components/UI/Input/Input";
import useRequest from "../../../hooks/useRequest";
import { emailConfig, passwordConfig } from "./config";
import { login } from "../../../context/userActions";
import { UserContext } from "../../../context/userContext";

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { setUser } = useContext(UserContext);

  const { doRequest, errors } = useRequest({
    url: process.env.REACT_APP_AUTH_SRV_URL + "/signup",
    method: "post",
    body: {
      email,
      password,
      password2,
    },
    onSuccess: (res) => {
      const { token, user } = res;
      login(setUser, token, user);
      history.push("/");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <>
      <div className={classes.MainContainer}>
        <div className={classes.Container}>
          <h2>Study Smart, Save Time</h2>
          {errors}
          <form onSubmit={onSubmit}>
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
              key={"password1"}
              elementType={passwordConfig.elementType}
              elementConfig={passwordConfig.elementConfig}
              invalid={passwordConfig.valid}
              shouldValidate={passwordConfig.validation}
              value={password}
              touched={passwordConfig.touched}
              label={passwordConfig.label}
              changed={(e) => setPassword(e.target.value)}
            />
            <Input
              key={"password2"}
              elementType={passwordConfig.elementType}
              elementConfig={passwordConfig.elementConfig}
              invalid={passwordConfig.valid}
              shouldValidate={passwordConfig.validation}
              value={password2}
              touched={passwordConfig.touched}
              label={"Confirm Password"}
              changed={(e) => setPassword2(e.target.value)}
            />
            <Button btnType="Info" type="submit">
              {" "}
              Sign Up{" "}
            </Button>
            <Button btnType="Info" clicked={() => history.push("/login")}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
