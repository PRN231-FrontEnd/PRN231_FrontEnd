import "../header/header.css";
import Logo from "../../assets/images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SelectDrop from "../selectDrop/selectDrop";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import { Button, ConfigProvider } from "antd";
import AccountSelectOptions from "../accountSelectDrop/accountSelect";
import { EditFilled, UnderlineOutlined } from "@ant-design/icons";
import Nav from "./nav/nav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
const fetchCountries = async () => {
  const res = await axios.get("https://countriesnow.space/api/v0.1/countries/");
  return res.data.data.map((item) => item.country);
};

function Header() {
  const [categories] = useState([
    "All Categories",
    "Milks and Dairies",
    "Wines & Alcohol",
    "Clothing & Beauty",
    "Pet Foods & Toy",
    "Fast food",
    "Vegetable",
    "Fresh Seafood",
    "Noodles & Rice",
    "Ice cream",
  ]);

  const {
    data: countryList = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
  const userId = user.jti;

  const handleCreatePost = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/create-post" : "/login");
  };

  if (isLoading) return <div></div>;
  if (error) {
    console.error("Error fetching countries:", error);
    return <div>Error fetching countries. Please try again later.</div>;
  }

  const handleChatClick = () => {
    navigate("/message");  // Navigate to /message
  };

  const handleManagePost = () => {
    navigate("/manage-posts");  // Navigate to /message
  };

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <Link to="/" className="col-sm-1 d-flex align-items-center">
              <img
                src={Logo}
                style={{ width: "400%", height: "50px" }}
                alt="Logo"
              />
            </Link>

            <div className="col-sm-4 d-flex flex-row align-items-center">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 className="brand-title">
                FlowerExchange
              </h1>
            </Link>

             
            </div>

            <div className="col-sm-7 d-flex flex-row align-items-center justify-content-end">
             
              <ul className="list list-inline mb-0 headerTabs">
                {/* <li className="list-inline-item">
                  <span className="badge bg-success " id="noti-badge">
                    23
                  </span>
                  <NotificationsNoneOutlinedIcon
                    className="icon"
                    titleAccess="Notification"
                    sx={{ fontSize: 30 }}
                  />
                </li> */}
                <li className="list-inline-item" onClick={handleChatClick} style={{ cursor: "pointer" }}>
                  <span className="badge bg-success" id="noti-chat">
                    Chat
                  </span>
                  <ChatOutlinedIcon className="icon" sx={{ fontSize: 30 }} />
                </li>
                {/* <li className="list-inline-item">
                  <span className="badge bg-success " id="noti-mall">
                    Store
                  </span>
                  <StorefrontIcon className="icon" sx={{ fontSize: 30 }} />
                </li> */}
                <li className="list-inline-item" onClick={handleManagePost} style={{cursor: "pointer"}}>
                  <FeaturedPlayListOutlinedIcon
                    className="icon"
                    sx={{ fontSize: 30 }}
                  />
                  <span>Manage Posts</span>
                </li>
                
          


                <li className="list-inline-item">
                  <AccountCircleOutlinedIcon
                    className="icon"
                    sx={{ fontSize: 30 }}
                  />
                  <AccountSelectOptions className="accountSelect" />
                </li>
              </ul>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#198754",
                    borderRadius: 2,
                    fontSize: 16,
                  },
                  components: {
                    Button: {
                      colorPrimary: "#198754",
                    },
                  },
                }}
              >
                <Button
                  type="dashed"
                  size="medium"
                  icon={<EditFilled />}
                  onClick={handleCreatePost}
                >
                  Create Post
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </header>
      <div className="nav-at-header">
        <Nav />
      </div>
    </>
  );
}

export default Header;
