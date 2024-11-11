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
import { Button, MenuItem, Select, TextField } from "@mui/material";
import "./style.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const hasFetched = useRef(false);

  const fetchData = async (page) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://flowerexchange.azurewebsites.net/Post/list-view-post",
        {
          searchString: searchString,
          paginateRequest: {
            currentPage: page,
            pageSize: 10,
          },
          sortCriterias: [
            {
              sortBy: "Flower.price",
              isDescending: sortOrder === "desc",
            },
          ],
        }
      );
      if (response.data === "No record match") {
        setProducts([]);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
      }
      // setProducts((prevProducts) => [...prevProducts, ...response.data]);
    } catch (error) {
      console.error("Error fetching product data", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData(currentPage);
      hasFetched.current = true;
    }
  }, [currentPage, searchString, sortOrder]);

  const handleSearch = () => {
    setCurrentPage(1);
    setProducts([]);
    fetchData(1);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const settings = {
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
            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
              <TextField
                label="Search by title"
                variant="outlined"
                fullWidth
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                style={{ marginRight: "10px", width: "300px" }}
              />
              <Select
                value={sortOrder}
                onChange={handleSortChange}
                variant="outlined"
                style={{ marginRight: "10px" }}
              >
                <MenuItem value="asc">Price Low to High</MenuItem>
                <MenuItem value="desc">Price High to Low</MenuItem>
              </Select>
              <Button
                variant="contained"
                color="success"
                onClick={handleSearch} // Trigger search with new criteria
              >
                Search
              </Button>
            </div>
          </div>
          <div className="productRow">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Link
                  to={`/post-details/${product.id}`}
                  key={uuidv4()}
                  className="item"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Product
                    id={product.id}
                    tag={product.priority ? "best" : null}
                    title={product.title}
                    description={product.description}
                    price={Math.ceil(product.flower?.price).toLocaleString()}
                    location={product.location}
                    imageUrl={product.mainImageUrl}
                  />
                </Link>
              ))
            ) : (
              <p>No products available.</p>
            )}
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
                {/* Slider content for Daily Best Sells */}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
