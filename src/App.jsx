import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/index";
import About from "./pages/About/index";
import Footer from "./components/footer/footer";
import ListingProducts from "./pages/Listing/index";
import { RouteProvider } from "./context/RouteProvider";
import { useRoutes } from "./context/RouteProvider";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import CreatePost from "./pages/CreatePost/index";

const queryClient = new QueryClient();

function RoutesWrapper() {
  const routes = useRoutes(); // Now this is within RouteProvider

  return (
    <Routes>
      <Route exact path={routes.HOME} element={<Home />} />
      <Route exact path={routes.ABOUT} element={<About />} />
      <Route exact path={routes.FLOWERS} element={<ListingProducts />} />
      <Route exact path={routes.POSTDETAILS} element={<PostDetails />} />
      <Route exact path={routes.CREATEPOST} element={<CreatePost />} />

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <BrowserRouter>
          <InnerApp /> {/* Sử dụng một component con để quản lý layout */}
        </BrowserRouter>
      </RouteProvider>
    </QueryClientProvider>
  );
}

function InnerApp() {
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  // Không hiển thị layout nếu đường dẫn là /login hoặc /register
  const shouldShowLayout = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Header />}
      <RoutesWrapper />
      {shouldShowLayout && <Footer />}
    </>
  );
}

export default App;
