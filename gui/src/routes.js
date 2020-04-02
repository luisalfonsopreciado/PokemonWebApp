import React from "react";
import { Route, Switch } from "react-router-dom";
import Pokemon from "./components/Pokemon/Pokemon";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Logout from "./containers/Auth/Logout/Logout";

const asyncPokeList = asyncComponent(() => {
  return import("./containers/PokeList/PokeList");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
const asyncSignup = asyncComponent(() => {
  return import("./containers/Auth/Signup/Signup");
});
const asyncProfile = asyncComponent(() => {
  return import("./containers/Profile/Profile");
});

const BaseRouter = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={asyncPokeList} />
      <Route exact path="/login" component={asyncAuth} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={asyncSignup} />
      <Route exact path="/pokemon/:id" component={Pokemon} />
      <Route exact path="/profile" component={asyncProfile} />
    </Switch>
  </React.Fragment>
);

export default BaseRouter;
