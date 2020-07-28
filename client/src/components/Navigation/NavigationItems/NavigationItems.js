import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import useAuth from "../../../hooks/useAuth";

const NavigationItems = (props) => {
  const { user } = useAuth();

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Poke App</NavigationItem>
      {!user ? (
        <NavigationItem link="/login">Login</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
      {user ? (
        <NavigationItem link="/profile">{user.data.email}</NavigationItem>
      ) : null}
      <NavigationItem link="/search">Search</NavigationItem>
    </ul>
  );
};
export default NavigationItems;
