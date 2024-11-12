import React from "react";
import Slider from "react-slick";
import "../slider/index.css";
import Slide1 from "../../../assets/images/slider-1.png";
import Slide2 from "../../../assets/images/slider-2.png";
import Button from "@mui/material/Button";
import SendOutlineButton from "@mui/icons-material/SendOutlined";

function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
  };

  return (
    <section className="homeSlider">
      <div className="container-fluid">
        <Slider {...settings} className="home_slider_Main">
          <div className="item">
            <img src='https://i.imgur.com/IxSS4mH.png' className="w-100" />
     
          </div>
          <div className="item">
            <img src='https://colorlib.com/wp/wp-content/uploads/sites/2/flower-store-templates.jpg' className="w-100" />
          </div>
        </Slider>

      </div>
    </section>
  );
}

export default HomeSlider;
