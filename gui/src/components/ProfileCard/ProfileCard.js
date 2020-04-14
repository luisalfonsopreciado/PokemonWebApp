import React, { Component } from "react";
import classes from "./ProfileCard.module.css";
import Button from "../UI/Button/Button";
import { createForm } from "../../shared/utility";

class ProfileCard extends Component {
  state = {
    form: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: this.props.username,
        },
        value: this.props.username,
        label: "Username",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: this.props.email,
        },
        value: this.props.email,
        label: "Email",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        touched: false,
      },
      first_name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: this.props.first_name,
        },
        value: this.props.first_name,
        label: "First Name",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        touched: false,
      },
      last_name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: this.props.last_name,
        },
        value: this.props.last_name,
        label: "Last Name",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
        touched: false,
      },
    },
  };
  inputChangedHandler = (event) => {
    console.log(event.target.value);
  };
  render() {

    let form = createForm(this.state.form)
    return (
      <div className={classes.Container}>
        <h5>{this.props.username}</h5>
        <div>
          <img alt="User" className={classes.ProfileImage} />
        </div>
        <form>
          <strong>{this.props.email}</strong>
          {form}
          <p>{this.props.first_name}</p>
          <p>{this.props.last_name}</p>
          <Button btnType="Info">SUBMIT CHANGES</Button>
        </form>
      </div>
    );
  }
}
export default ProfileCard;
