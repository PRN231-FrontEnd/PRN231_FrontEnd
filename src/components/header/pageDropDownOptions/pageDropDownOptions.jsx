import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "../pageDropDownOptions/pageDropDownOptions.css";
import { useRoutes } from "../../../context/RouteProvider";

const MyDropdown = ({ button }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const routes = useRoutes();
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
          <Link to="/account/settings">Account Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/account/wallet">Account Wallet</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/posts/individual-posts">Your Individual Post</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/store/your-store">Your Store</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={routes.SETUPSTORE}>Set Up Store</Link>
        </MenuItem> 
        <MenuItem onClick={handleClose}>
          <Link to="/store/store-posts">Your Store Posts</Link>
        </MenuItem>        
        <MenuItem onClick={handleClose}>
          <Link to="/post-services/checkout">Post Services Checkout</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/post-services/payment">Post Service Payment</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/shop/checkout-buy-now">Shop Payment Buy Now</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/shop/checkout-deposit">Shop Payment Deposit</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/shop/payment">Shop Payment Deposit</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/saved-posts">Your Saved Posts</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/messages">Messages</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/notification">Notification</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/post-report">Post Report</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/seller-rating">Seller Rating</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/store-rating">Store Rating</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/invoice-transactions/">Invoice Transactions</Link>
        </MenuItem>   
        <MenuItem onClick={handleClose}>
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        </MenuItem>      
      </Menu>
    </div>
  );
};

export default MyDropdown;
