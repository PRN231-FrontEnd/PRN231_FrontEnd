import React from "react";
import CustomNavbar from "./CustomNavbar.jsx";
import SideBar from "./sidebar.jsx";
import Footer from "./footer.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="all-container">
      <CustomNavbar />
      <div className="d-flex">
        {/* <SideBar /> */}
        <div className="content-container">
          <div className="App-header">
            <Outlet /> {/* Nội dung trang sẽ được render ở đây */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
