import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import Footer from "./components/footer/footer";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route exact={true} path="/about" element={<About />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
