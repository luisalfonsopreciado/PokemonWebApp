import React, { Component } from "react";
import classes from "./ProfileCard.module.css";
import Button from "../UI/Button/Button";
import profilePicture from "../../assets/images/defaultProfile.png";
import { createForm, updateObject } from "../../shared/utility";

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

  inputChangedHandler = (event, controlName) => {
    console.log(event.target.value);
    const updatedControls = updateObject(this.state.form, {
      [controlName]: updateObject(this.state.form[controlName], {
        value: event.target.value,
        valid: true,
        touched: true,
      }),
    });
    this.setState({
      form: updatedControls,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const username = this.state.form.username.value;
    const first_name = this.state.form.first_name.value;
    const last_name = this.state.form.last_name.value;
    const user = { username, first_name, last_name };
    this.props.onSubmit(user, this.props.token);
  };
  render() {
    let form = createForm(this.state.form, this.inputChangedHandler);
    return (
      <div className={classes.Container}>
        <h1>{this.props.username}</h1>

        <img alt="User" className={classes.ProfileImage} src={profilePicture} />
        <div>
          <Button btnType="Info">Edit</Button>
        </div>
        <form onSubmit={this.submitHandler} className={classes.Form}>
          <strong>{this.props.email}</strong>
          {form}
          <Button btnType="Info">SUBMIT CHANGES</Button>
        </form>
      </div>
    );
  }
}
export default ProfileCard;
