import React, {Suspense} from "react";
import { Route, Switch } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
const PokeList = React.lazy(() => import("./containers/PokeList/PokeList"))
const Auth = React.lazy(() => import("./containers/Auth/Auth"))
const Signup = React.lazy(() => import("./containers/Auth/Signup/Signup"))
const Profile = React.lazy(() => import("./containers/Profile/Profile"))
const Pokemon = React.lazy(() => import("./components/Pokemon/Pokemon"))
const PokeSearch = React.lazy(() => import("./containers/PokeSearch/PokeSearch"))

const renderComponent = (Component) => {
  return (data) => (
    <Suspense fallback={null}>
      <Component {...data} />
    </Suspense>
  );
};

const BaseRouter = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" render={renderComponent(PokeList)} />
      <Route exact path="/login" render={renderComponent(Auth)} />
      <Route exact path="/logout" render={renderComponent(Logout)} />
      <Route exact path="/signup" render={renderComponent(Signup)} />
      <Route exact path="/pokemon/:id" render={renderComponent(Pokemon)} />
      <Route exact path="/profile" render={renderComponent(Profile)} />
      <Route exact path="/search" render={renderComponent(PokeSearch)} />
    </Switch>
  </React.Fragment>
);

export default BaseRouter;
