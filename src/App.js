import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailPage from "./pages/PostDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Sử dụng Layout ở đây
    children: [
      { path: "/", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "posts/:id", element: <PostDetailPage /> }, // Route cho PostDetailPage
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
