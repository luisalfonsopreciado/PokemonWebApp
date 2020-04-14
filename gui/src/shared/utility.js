import React from 'react'
import Input from "../components/UI/Input/Input"
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
};

export const createHTTPHeaders = (token) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

export const createForm = (JSONForm, inputChangedHandler) => {
  const formElementsArray = createFormElementsArray(JSONForm);
  return formElementsArray.map((formElement, key) => {
    return (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        value={formElement.config.value}
        touched={formElement.config.touched}
        label={formElement.config.label}
        changed={(event) => inputChangedHandler(event, formElement.id)}
      />
    );
  });
};
const createFormElementsArray = (controls) => {
  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }
  return formElementsArray;
};
