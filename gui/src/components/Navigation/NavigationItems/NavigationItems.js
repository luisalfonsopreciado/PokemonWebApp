import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Poke App</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/login">Login</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/profile">{props.userId}</NavigationItem>
    ) : null}
    <NavigationItem link="/search">Search</NavigationItem>
  </ul>
);
export default NavigationItems;
