import React from "react";
import { Route, Switch } from "react-router-dom";
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
const asyncPokemon = asyncComponent(() => {
  return import("./components/Pokemon/Pokemon");
});
const asyncPokeSearch = asyncComponent(() => {
  return import("./containers/PokeSearch/PokeSearch");
});

const BaseRouter = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={asyncPokeList} />
      <Route exact path="/login" component={asyncAuth} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={asyncSignup} />
      <Route exact path="/pokemon/:id" component={asyncPokemon} />
      <Route exact path="/profile" component={asyncProfile} />
      <Route exact path="/search" component={asyncPokeSearch} />
    </Switch>
  </React.Fragment>
);

export default BaseRouter;
