import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeSlider from "./slider/index";
import Product from "../../components/product/product";
import { Link } from "react-router-dom";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import "./style.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchData = async (page) => {
    if (loading) return;
  
    setLoading(true);
    try {
      const response = await axios.post(
        "https://flowerexchange.azurewebsites.net/Post/list-view-post",
        {
          searchString,
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
  
      console.log("API Response:", response.data);
  
      // Kiểm tra dữ liệu trả về từ API
      if (response.data === "No record match" || !response.data || response.data.length === 0) {
        // Nếu không có dữ liệu, không thay đổi trang
        if (page === 1) setProducts([]);
      } else {
        // Tránh trùng dữ liệu, chỉ thêm vào nếu sản phẩm chưa tồn tại
        setProducts((prevProducts) => {
          const newProducts = response.data.filter(
            (newProduct) => !prevProducts.some((product) => product.id === newProduct.id)
          );
          return [...prevProducts, ...newProducts];
        });
      }
    } catch (error) {
      console.error("Error fetching product data", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, searchString, sortOrder]);

  const handleSearch = () => {
    setCurrentPage(1);
    setProducts([]);
    fetchData(1);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <HomeSlider />
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
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          <div className="productRow">
            {products.length > 0 ? (
              products.map((product) => (
                <Link
                  to={`/post-details/${product.id}`}
                  key={product.id}
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
            ) : currentPage === 1 ? (
              <p>No flowers for sale.</p>
            ) : null}
          </div>

          {/* Nút Load More */}
          {loading ? (
            <Button variant="outlined" disabled style={{ display: "block", margin: "20px auto" }}>
              Loading...
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleLoadMore}
              style={{ display: "block", margin: "20px auto" }}
            >
              Load More
            </Button>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
