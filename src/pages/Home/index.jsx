import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import HomeSlider from "./slider/index";
import CatSlider from "../../components/catSlider/catSlider";
import Banners from "../../components/banners/banners";
import Product from "../../components/product/product";
import { ArrowForward } from "@mui/icons-material";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import "./style.css";
import { Button } from "@mui/material";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasFetched = useRef(false);

  const fetchData = async (page) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://flowerexchange.azurewebsites.net/Post/list-view-post",
        {
          searchString: "",
          paginateRequest: {
            currentPage: page,
            pageSize: 10,
          },
        }
      );

      setProducts((prevProducts) => [...prevProducts, ...response.data]);
    } catch (error) {
      console.error("Error fetching product data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData(currentPage);
      hasFetched.current = true;
    }
  }, [currentPage]);

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
            {products.map((product) => (
              <Link
                to={`/post-details/${product.id}`}
                key={uuidv4()}
                className="item"
                style={{ textDecoration: "none", color: "inherit" }} // Xóa gạch chân và giữ màu chữ
              >
                <Product
                  id={product.id}
                  tag={product.priority ? "best" : null}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  location={product.location}
                  imageUrl={product.mainImageUrl}
                />
              </Link>
            ))}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            >
              Load More
            </Button>
          )}
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
                <div className="banner-text">
                  <h2 className="mb-100">
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
                {/* {products.map((product, index) => (
                  <div className="item" key={`${product.id}-${index}`}>
                    <Product
                      id={product.id}
                      tag={product.priority ? "best" : null}
                      title={product.title}
                      description={product.description}
                      price={product.price}
                      location={product.location}
                      imageUrl={product.mainImageUrl}
                    />
                  </div>
                ))} */}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
