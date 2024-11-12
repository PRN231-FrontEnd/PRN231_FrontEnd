import React from "react";
import "./nav.css";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import PageDropDownOptions from "../pageDropDownOptions/pageDropDownOptions";
import { useRoutes } from "../../../context/RouteProvider";

function Nav() {
  const routes = useRoutes();

  return (
    <div className="nav d-flex align-items-center">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-end">
          {/* Brand / Logo */}
          {/* <Link className="navbar-brand me-auto" to={routes.HOME}>
            <img src="/logo.png" alt="Logo" />
          </Link> */}

          {/* Toggler for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto d-flex align-items-center">
              {/* Home */}
              <li className="nav-item">
                <Button>
                  <Link to={routes.HOME} className="nav-link">
                    Home
                  </Link>
                </Button>
              </li>
              <li className="nav-item">
                <Button>
                  <Link  className="nav-link">
                    About
                  </Link>
                </Button>
              </li>
              <li className="nav-item">
                <Button>
                  <Link  className="nav-link">
                    Contact Us
                  </Link>
                </Button>
              </li>

              {/* Shop
              <li className="nav-item">
                <Button>
                  <Link to={routes.FLOWERS} className="nav-link">
                    Shop
                  </Link>
                </Button>
              </li> */}

              {/* Pages Dropdown */}
              {/* <li className="nav-item dropdown">
                <PageDropDownOptions
                  button={
                    <Button className="nav-link">
                      Pages <KeyboardArrowDownIcon />
                    </Button>
                  }
                />
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
