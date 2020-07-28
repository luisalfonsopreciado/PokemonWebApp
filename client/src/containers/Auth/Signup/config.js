export const emailConfig = {
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
  };
  
  export const passwordConfig = {
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
  };