import React from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity, createForm } from "../../shared/utility";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        label: "Email",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        label: "Password",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    IsSignup: true,
  };

  componentDidMount() {
    this.props.resetError()
    if (this.props.auth.token != null) {
      this.props.onSetAuthRedirectPath();
    }
  }

  pokemonSelectedHandler(name) {
    this.props.history.push({ pathname: "/pokemon/" + name });
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.onLogin(email, password);
  };

  switchAuthModeHandler = () => {
    this.props.history.push("/signup");
  };

  render() {
    let form = createForm(this.state.controls, this.inputChangedHandler);

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{color:"red"}}>{this.props.auth.error[0]}</p>;
    }

    let authRedirect = null;
    if (this.props.auth.token !== null) {
      authRedirect = <Redirect to={this.props.auth.authRedirectPath} />;
    }

    return (
      <div className={classes.Container}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success"> SUBMIT </Button>
          <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
            SIGN UP
          </Button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => {
      dispatch(actions.login(email, password));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    resetError: () => dispatch(actions.authResetErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
