import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SideBar = () => {
  return (
    <div className="vh-100">
      {" "}
      {/* Bootstrap utility classes */}
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Contrast
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="th-large">
              <Link to="/">Dashboard</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="sticky-note">
              <Link to="about">About</Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem icon="credit-card" iconType="solid">
              <Link to="about">Metrics</Link>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
