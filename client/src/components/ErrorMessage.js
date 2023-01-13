import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ varient = "info", children }) => {
  return (
    <Alert variant={varient} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;


