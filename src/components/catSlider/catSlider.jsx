import React, { useState } from "react";
import "./catSlider.css";
import Slider from "react-slick";

function CatSlider() {

  const [itemBg, setItemBg] = useState([
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#fffceb",
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#fffceb",
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#fffceb",
  ]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
  };

  return (
    <>
      <div className="catSliderSection">
        <div className="container-fluid">
          <h2 className="hd">Featured Categories</h2>
          <Slider {...settings} className='cat_slider_Main' id="cat_slider_Main">
            {
              itemBg.length !== 0 &&
              itemBg.map((item, index) => {
                return (
                  <div className="item" key={index}> {/* Add key prop here */}
                    <div className="info" style={{ background: item }}>
                      <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-13.png" alt="Category" />
                      <h5>Cake & Milk</h5>
                      <p>26 items</p>
                    </div>
                  </div>
                );
              })
            }


            {/* <div className="item">
                <div className="info">
                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-13.png"/>
                    <h5>Cake & Milk</h5> 
                    <p>26 items</p>
                </div>
            </div> */}


          </Slider>
        </div>
      </div>
    </>
  );
}

export default CatSlider;
