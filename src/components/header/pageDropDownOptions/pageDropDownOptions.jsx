import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../pageDropDownOptions/pageDropDownOptions.css";

const MyDropdown = ({ button }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={open ? 'dropdown-open' : ''}>
      {/* Render dynamic button with arrow */}
      <div className="dropdown-button" onClick={handleClick}>
        {button}
        <ArrowDropDownIcon className="dropdown-arrow" />
      </div>
      <Menu
        id="pages-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/about">About Us</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/contact">Contact</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/account">My Account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/login">Login</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/register">Register</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/forgot-password">Forgot password</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/reset-password">Reset password</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/purchase-guide">Purchase Guide</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/terms-of-service">Terms of Service</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyDropdown;
