import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import Footer from "./components/footer/footer";
import ListingProducts from "./pages/Listing/index"
import { RouteProvider } from "./context/RouteProvider";  
import { useRoutes } from "./context/RouteProvider"; 

const queryClient = new QueryClient();

function RoutesWrapper() {
  const routes = useRoutes(); // Now this is within RouteProvider

  return (
    <Routes>
      <Route exact={true} path={routes.HOME} element={<Home />} />
      <Route exact={true} path={routes.ABOUT} element={<About />} />
      <Route exact={true} path={routes.FLOWERS} element={<ListingProducts />} />
    </Routes>
  );
}


function App() {
  
  return (
    
      <QueryClientProvider client={queryClient}>
        <RouteProvider>
          <BrowserRouter>
            <Header />
              <RoutesWrapper/>
            <Footer />
          </BrowserRouter>
        </RouteProvider>
      </QueryClientProvider>
    
  );
}

export default App;
