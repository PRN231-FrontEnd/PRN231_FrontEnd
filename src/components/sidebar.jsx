import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from "cdbreact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faQuestion,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

const SideBar = () => {
  return (
    <div className="vh-100">
      {/* Bootstrap utility classes */}
      <CDBSidebar>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Contrast
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faGauge}
                  style={{ marginRight: "8px" }}
                />
                Dashboard
              </Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <Link
                to="/products"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faProductHunt}
                  style={{ marginRight: "8px" }}
                />
                Products
              </Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <Link
                to="/about"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faQuestion}
                  style={{ marginRight: "8px" }}
                />
                About
              </Link>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem>
              <Link
                to="/ErrorLinkInSideBarComponent"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  style={{ marginRight: "8px" }}
                />
                Money
              </Link>
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
