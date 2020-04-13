export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) =>{
    let isValid = true
    if(!rules){
        return true
    }
    if(rules.required){
        isValid = (value.trim() !== '' && isValid)
    }
    if(rules.minLength){
        isValid = (value.length >= rules.minLength && isValid)
    }
    if(rules.maxLength){
        isValid = (value.length <= rules.maxLength && isValid)
    }
    return isValid
}

export const handleErrorHandler = (error) => {
    const keys = Object.keys(error)
    const values = Object.values(error)
    const Message = []
    for(let i = 0; i < keys.length; i++){
        Message.push(keys[i] + " : " +  values[i][0])
    }
    return Message
}

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
  return config
}