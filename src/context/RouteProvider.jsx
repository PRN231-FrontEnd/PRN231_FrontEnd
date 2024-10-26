import React, { createContext, useContext } from "react";

// Define your routes in an object
const RouteContext = createContext();

const routes = {
  HOME: "/",
  ABOUT: "/about",
  FLOWERS: "/flowers",
  CONTACT: "/contact",
  CREATEPOST: "/create-post",
<<<<<<< HEAD
  POSTDETAILS: "/postdetails/:id",
  MESSAGE: "/message",
=======
  POSTDETAILS: "/post-details/:id",
>>>>>>> 51a6fc4b0ba80049192727a40a60040cbc4469cd
};

// Create a provider component that wraps your app
export const RouteProvider = ({ children }) => {
  return (
    <RouteContext.Provider value={routes}>{children}</RouteContext.Provider>
  );
};

// Create a custom hook to access the routes
export const useRoutes = () => {
  const context = useContext(RouteContext);

  if (!context) {
    throw new Error("useRoutes must be used within a RouteProvider");
  }

  return context;
};
