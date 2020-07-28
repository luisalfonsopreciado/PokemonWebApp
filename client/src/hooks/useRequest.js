import axios from "axios";
import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import useAuth from "./useAuth";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const { token } = useAuth();
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const bod = method === "get" ? headers : { ...body };

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, bod, headers);

      if (onSuccess) {
        onSuccess(response.data);
      }

      console.log(response);

      return response.data;
    } catch (err) {
      console.log(err);
      setErrors(
        <div className="alert alert-danger">
          {err.response ? (
            err.response.data.errors.map((err) => (
              <Alert severity="error" key={err.message}>
                {err.message}
              </Alert>
            ))
          ) : (
            <Alert severity="error" key="message">
              Network Error
            </Alert>
          )}
        </div>
      );
    }
  };

  return { doRequest, errors };
};
