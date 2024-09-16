import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div>404 Not Found !</div>
      <Link to="/">Click here to back to our home page</Link>
    </>
  );
};

export default NotFoundPage;
