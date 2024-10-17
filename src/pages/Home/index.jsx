import React from "react";
import HomeSlider from "./slider/index";
import CatSlider from "../../components/catSlider/catSlider";
import Banners from "../../components/banners/banners";
import Product from "../../components/product/product";
import { ArrowForward } from "@mui/icons-material";
import Slider from "react-slick";

import "./style.css";
import { Button } from "@mui/material";

function Home() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    autoplay: 2000,
  };

  return (
    <>
      <HomeSlider />
      <CatSlider />
      <Banners />
      <section className="homeProducts">
        <div className="container-fluid">
          <div className="d-flex align-items-center nav-small">
            <h2 className="hd mb-0 mt-0">Popular Flowers</h2>
            <ul className="list list-inline filterTab">
              <li className="list-inline-item">
                <a className="cursor">All</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">Milks & Dairies</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">Coffee & Teas</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">Pet Foods</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">Meats</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">Vegetables</a>
              </li>
            </ul>
          </div>
          <div className="productRow">
            <div className="item">
              <Product tag="sale" />
            </div>

            <div className="item">
              <Product tag="new" />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>

            <div className="item">
              <Product />
            </div>
            <div className="item">
              <Product tag="hot" />
            </div>

            <div className="item">
              <Product tag="new" />
            </div>
            <div className="item">
              <Product />
            </div>
            <div className="item">
              <Product tag="hot" />
            </div>
            <div className="item">
              <Product />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>
          </div>
        </div>
      </section>

      <section className="homeProducts homeProductsRow2 pt-0">
        <div className="container-fluid">
          <div className="d-flex align-items-center nav-small">
            <h2 className="hd mb-0 mt-0">Daily Best Sells</h2>
            <ul className="list list-inline filterTab">
              <li className="list-inline-item">
                <a className="cursor">Featured</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">Popular</a>
              </li>
              <li className="list-inline-item">
                <a className="cursor">New Added</a>
              </li>
            </ul>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-md-3">
              <div className="banner">
                <img
                  src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-4.png"
                  className="w-100 bannerImg"
                />
                <div class="banner-text">
                  <h2 class="mb-100">
                    Bring nature <br /> into your <br /> home
                  </h2>
                  <Button
                    className="button"
                    variant="contained"
                    color="success"
                    style={{ backgroundColor: "#279a65" }}
                    endIcon={<ArrowForward />}
                  >
                    Shop now
                  </Button>{" "}
                </div>
              </div>
            </div>
            <div className="col-md-9 pr-5">
              <Slider {...settings} className="prodSlider">
              <div className="item">
              <Product tag="best" />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>
            <div className="item">
              <Product tag="best" />
            </div>
            
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
