import React from "react";
import "./nav.css";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HeadphoneOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import { Dropdown, Menu } from "antd";
import GridViewIcon from "@mui/icons-material/GridView";
import { Link } from "react-router-dom";
import PageDropDownOptions from "../pageDropDownOptions/pageDropDownOptions";
import { useRoutes } from "../../../context/RouteProvider";

function Nav() {
  const routes = useRoutes();
  return (
    <div className="nav d-flex align-items-center">
      <div className="container-fluid">
        <div className="row position-relative">
          <div className="col-sm-3 part 1  d-flex align-items-center">
            <Button className="bg-g text-white catTab button-browseall">
              <GridViewIcon /> &nbsp; Browse All Categories
              <KeyboardArrowDownIcon />
            </Button>
          </div>
          <div className="col-sm-7 part 2 position-static">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="#"></a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="list list-inline navbar-nav">
                  <li className="list-inline-item nav-item">
                    <Button>
                      <Link to={routes.HOME}>Home</Link>
                    </Button>
                  </li>
                  <li className="list-inline-item nav-item">
                    <Button>
                      <Link to={routes.ABOUT}>About</Link>
                    </Button>
                  </li>
                  <li className="list-inline-item nav-item">
                    <Button>
                      <Link to={routes.FLOWERS}>Shop</Link>
                    </Button>
                  </li>
                  {/* <li className="list-inline-item nav-item">
                    <Button>
                      <Link>Vendors</Link>
                    </Button>
                  </li> */}
                  {/* <li className="list-inline-item nav-item">
                    <Button>
                      <Link>Mega menu</Link>
                    </Button>
                  </li> */}
                  <li className="list-inline-item nav-item">
                    <Button>
                      <Link>Blog</Link>
                    </Button>
                  </li>
                  <li className="list-inline-item nav-item">
                    <PageDropDownOptions
                      button={
                        <Button>
                          <Link>Pages</Link>
                        </Button>
                      }
                    />
                  </li>
                  <li className="list-inline-item nav-item">
                    <Button>
                      <Link>Contact</Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-sm-2 part3 d-flex align-items-center">
            <div className="phNo d-flex align-items-center">
              <span>
                <HeadphoneOutlinedIcon />
              </span>
              <div className="info ml-3">
                <h3 className="text-g mb-0">1900 - 888</h3>
                <p className="mb-0"> 24/7 Support Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
