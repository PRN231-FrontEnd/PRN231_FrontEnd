import React, { useState } from "react";
import "./banners.css";
import { Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
function Banners() {
  return (
    <>
      <div className="bannerSection">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="box">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-1.png"
                  className="w-100 transition"
                />
                <div className="info">
                  <h2 className="mb-4">
                    Everyday Fresh &
                    <br />
                    Clean with Our
                    <br />
                    Products
                  </h2>
                  <Button
                    className="button"
                    variant="contained"
                    color="success"
                    style={{ backgroundColor: "#279a65" }}
                    endIcon={<ArrowForward />}
                  >
                    Shop now
                  </Button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="box">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-2.png"
                  className="w-100 transition"
                />
                <div className="info">
                  <h2 className="mb-4">
                    Everyday Fresh &
                    <br />
                    Clean with Our
                    <br />
                    Products
                  </h2>
                  <Button
                    className="button"
                    variant="contained"
                    color="success"
                    style={{ backgroundColor: "#279a65" }}
                    endIcon={<ArrowForward />}
                  >
                    Shop now
                  </Button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="box">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-3.png"
                  className="w-100 transition"
                />
                <div className="info">
                  <h2 className="mb-4">
                    Everyday Fresh &
                    <br />
                    Clean with Our
                    <br />
                    Products
                  </h2>
                  <Button
                    className="button"
                    variant="contained"
                    color="success"
                    style={{ backgroundColor: "#279a65" }}
                    endIcon={<ArrowForward />}
                  >
                    Shop now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banners;
