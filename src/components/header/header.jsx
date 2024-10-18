import "../header/header.css";
import Logo from "../../assets/images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
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
import { EditFilled } from "@ant-design/icons";
import Nav from "./nav/nav";

const fetchCountries = async () => {
  const res = await axios.get("https://countriesnow.space/api/v0.1/countries/");
  return res.data.data.map((item) => item.country);
};

function Header() {
  const [categories, setCategories] = useState([
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

  //WAY 1: fetch and catch countries
  const {
    data: countryList = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["countries"], // Define a unique key for the query
    queryFn: fetchCountries, // Function to fetch data
  });

  const [position, setPosition] = useState("end");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching countries</div>;

  //WAY 2: use useEffect
  //--------------------
  // const [countryList, setCountryList] = useState([]);
  // useEffect(() => {
  //     getCountry('https://countriesnow.space/api/v0.1/countries/');
  // }, [countryList])

  // const getCountry = async (url) => {
  //     try {
  //       const res = await axios.get(url);
  //       if (res && res.data && res.data.data) {
  //         const countries = res.data.data.map((item) => item.country);
  //         setCountryList(countries); // Update state with the list of countries
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  return (
    <>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-1 d-flex align-items-center">
              <img
                src={Logo}
                style={{ width: "100%", height: "70px"}}
                alt="Logo"
              />
            </div>

            {/*headerSearch by category start here */}
            <div className="col-sm-5 d-flex flex-row align-items-center">
              <div className="headerSearch d-flex flex-row align-items-center">
                <SelectDrop
                  data={categories}
                  className="selectDrop cursor position-relative"
                />

                <div className="search">
                  <input type="text" placeholder="Search for items..." />
                  <SearchIcon className="searchIcon cursor" />
                </div>
              </div>
            </div>

            <div className="col-sm-6 d-flex flex-row align-items-center">
              <div className="countryWrapper">
                <LocationOnIcon style={{ opacity: "50%" }} />
                <SelectDrop
                  data={countryList}
                  className="cursor position-relative"
                />
              </div>
              <ul className="list list-inline mb-0 headerTabs">
                <li className="list-inline-item">
                  {/* <span>Notification</span> */}
                  <span className="badge bg-success " id="noti-badge">
                    23
                  </span>
                  <NotificationsNoneOutlinedIcon
                    className="icon"
                    titleAccess="Notification"
                    sx={{ fontSize: 30 }}
                  />
                </li>
                <li className="list-inline-item">
                  {/* <span>Chat</span> */}
                  <span className="badge bg-success " id="noti-chat">
                    23
                  </span>
                  <ChatOutlinedIcon className="icon" sx={{ fontSize: 30 }} />
                </li>
                <li className="list-inline-item">
                  {/* <span>Transaction</span> */}
                  <span className="badge bg-success " id="noti-mall">
                    20+
                  </span>
                  <LocalMallOutlinedIcon
                    className="icon"
                    sx={{ fontSize: 30 }}
                  />
                </li>
                <li className="list-inline-item">
                  <FeaturedPlayListOutlinedIcon
                    className="icon"
                    sx={{ fontSize: 30 }}
                  />
                  <span>Manage Posts</span>
                </li>
                <li className="list-inline-item">
                  <span>
                    <AccountCircleOutlinedIcon
                      className="icon"
                      sx={{ fontSize: 30 }}
                    />
                  </span>
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
                  icon={<EditFilled />}>
                  Create Post
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
       
      </header>
      <div className="nav-at-header" >
        <Nav />
      </div>
      
    </>
  );
}

export default Header;
