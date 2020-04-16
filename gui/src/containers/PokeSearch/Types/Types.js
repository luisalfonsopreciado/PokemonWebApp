import React, { useEffect, useState } from "react";
import { getPokemonTypes } from "../../../shared/utility";
import Input from '../../../components/UI/Input/Input'

const TypeOptions = ({
  ticker: {
    elementType,
    valid,
    validation,
    value,
    touched,
    label,
  },
  inputChangedHandler
}) => {

  const [typeArray, setTypeArray] = useState([]);

  useEffect(() => {
    console.log("Use Effect Called")
    const typeArray = getPokemonTypes();
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
