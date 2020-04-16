import React, { useEffect, useState } from "react";
import Input from '../../../components/UI/Input/Input'

const TypeOptions = ({
  types: {
    elementType,
    valid,
    validation,
    value,
    touched,
    label,
  },
  inputChangedHandler,
  getOptions
}) => {

  const [typeArray, setTypeArray] = useState([]);

  useEffect(() => {
    console.log("Use Effect Called")
    const typeArray = getOptions();
    typeArray.then((ticker) => setTypeArray(ticker));
  }, []);


  const elementConfig = {
    options: typeArray
  }
  
  let input = null
  if(typeArray.length > 0){
   input =  <Input
    key="ticker"
    elementType={elementType}
    elementConfig={elementConfig}
    invalid={valid}
    shouldValidate={validation}
    value={value}
    touched={touched}
    label={label}
    changed={(event) => inputChangedHandler(event, "ticker")}
  />
  }
  return (
    <React.Fragment>
      {input}
    </React.Fragment>
  );
};

export default TypeOptions;
