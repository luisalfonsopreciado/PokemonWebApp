import React, { useEffect, useState } from "react";
import Input from "../../../components/UI/Input/Input";

const TypeOptions = ({
  types: { elementType, valid, validation, value, touched, label },
  changed,
  getOptions,
}) => {
  const [typeArray, setTypeArray] = useState([]);

  useEffect(() => {
    console.log("Use Effect Called");
    const typeArray = getOptions();
    typeArray.then((ticker) => setTypeArray(ticker));
  }, [getOptions]);

  const elementConfig = {
    options: typeArray,
  };

  let input = null;
  if (typeArray.length > 0) {
    input = (
      <Input
        key="ticker"
        elementType={elementType}
        elementConfig={elementConfig}
        invalid={valid}
        shouldValidate={validation}
        value={value}
        touched={touched}
        label={label}
        changed={changed}
      />
    );
  }
  return <React.Fragment>{input}</React.Fragment>;
};

export default TypeOptions;
