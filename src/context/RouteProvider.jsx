import React, { createContext, useContext } from "react";

// Define your routes in an object
const RouteContext = createContext();

const routes = {
  HOME: "/",
  ABOUT: "/about",
  FLOWERS: "/flowers",
  CONTACT: "/contact",  // Add more routes as needed
};

// Create a provider component that wraps your app
export const RouteProvider = ({ children }) => {
  return (
    <RouteContext.Provider value={routes}>
      {children}
    </RouteContext.Provider>
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
