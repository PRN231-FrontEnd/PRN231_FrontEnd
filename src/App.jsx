import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/index";
import Footer from "./components/footer/footer";
import ListingProducts from "./pages/Listing/index";
import { RouteProvider } from "./context/RouteProvider";
import { useRoutes } from "./context/RouteProvider";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import CreatePost from "./pages/CreatePost/index";
import Message from "./pages/Message";
import ShopPage from "./pages/ShopPage";
import AccountWallet from "./pages/AccountWallet/index";
import PaymentMethods from "./pages/Payment";
import SuccessNoti from "./pages/SuccessNoti";
import ProfilePage from "./pages/UserProfile";
import PostUpdate from "./pages/PostUpdate";
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoutesWrapper() {
  const routes = useRoutes(); // Now this is within RouteProvider

  return (
    <Routes>
      <Route exact path={routes.HOME} element={<Home />} />
      <Route exact path={routes.FLOWERS} element={<ListingProducts />} />
      {/* <Route exact path={routes.POSTDETAILS} element={<PostDetails />} /> */}
      <Route exact path="/post-details/:id" element={<PostDetails />} />
      <Route exact path="/post-update/:id" element={<PostUpdate />} />

      <Route exact path="/user-profile/:id" element={<ProfilePage />} />
      <Route exact path="/post-shop/:id" element={<ShopPage />} />
      <Route
        exact
        path="/Checkout-detail/:postId"
        element={<PaymentMethods />}
      />
      <Route exact path={routes.CREATEPOST} element={<CreatePost />} />
      <Route exact path={routes.MESSAGE} element={<Message />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/wallet" element={<AccountWallet />} />
      <Route exact path="/charge/noti" element={<SuccessNoti />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteProvider>
        <BrowserRouter>
          <InnerApp /> 
        </BrowserRouter>
      </RouteProvider>
    </QueryClientProvider>
  );
}

function InnerApp() {
  const location = useLocation(); 

  const shouldShowLayout = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Header />}
      <RoutesWrapper />
      <ToastContainer />
    </>
  );
}

export default App;
