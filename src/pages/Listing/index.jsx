import React from 'react';
import './style.css';
import "../../components/sidebar/sidebar"
import Sidebar from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom';
import Product from '../../components/product/product';
import { Breadcrumb, Select } from "antd";
import { Box, Pagination } from '@mui/material';


function ListingProducts(){
    return (
      <>
        <section className="listingPage">
          <div className="container-fluid">
            <div className="breadcrumb d-flex align-items-center">
              <h1>Snack</h1>
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                  {
                    title: <a href="/flowers">Shop</a>,
                  }
                ]}
              />
            </div>
            <div className="listingData">
              <div className="row">
                <div className="col-md-3 sidebarWrapper">
                  <Sidebar />
                </div>
                <div className="col-md-9 rightContent homeProducts pt-0">
                  <div className="filter-row-section d-flex justify-content-between align-items-center">
                    <p className="mb-0">
                      We found <span className="text-success">29</span> items for you!
                    </p>

                    {/* Sorting and Selling Type Options Container */}
                    <div className="d-flex align-items-center">
                      {/* Sell Type Options */}
                      <div className="ms-3">
                        <label htmlFor="sellerType" className="me-2">Seller:</label>
                        <Select id="sellType" defaultValue="all" style={{ width: 150 }}>
                          <Option value="all">All</Option>
                          <Option value="individual">Individual Sell</Option>
                          <Option value="shop">Shop Sell</Option>
                        </Select>
                      </div>

                      {/* Sorting Options */}
                      <div className="ms-3">
                        <label htmlFor="sortBy" className="me-2">Sort by:</label>
                        <Select id="sortBy" defaultValue="newest" style={{ width: 150 }}>
                          <Option value="newest">News Post First</Option>
                          <Option value="lowPrice">Low Price First</Option>
                          <Option value="highPrice">High Price First</Option>
                        </Select>
                      </div>

                      
                    </div>
                  </div>
                  {/* Show Flowers List */}
                  <div className="productRow pl-4 pr-3">
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>{" "}
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                    <div className="item">
                      <Product />
                    </div>
                  </div>
                  <div className="paginationWrapper mt-5">
                  <Box display="flex" justifyContent="center">
                    <Pagination
                      count={10} // Total number of pages
                      variant="outlined"
                      shape="rounded"
                      size="large"
                      color= "primary" // Adjust size for a larger pagination
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: '50%', 
                          fontSize: '16px',
                          margin: '0 5px',
                           
                        },
                      }}
                    />
                  </Box>
                </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );


}

export default ListingProducts