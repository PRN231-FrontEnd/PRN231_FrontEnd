import React from "react";
import "./product.css";
import { Button, Tooltip } from "@mui/material";
import {
  ShoppingCartOutlined,
  HistoryOutlined,
  LocationOnOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function Product(props) {
  // Giả sử bạn có một ID cho sản phẩm
  const productId = "123"; // Thay thế bằng ID thực tế của sản phẩm

  return (
    <>
      <div className="productThumb">
        {props.tag !== null && props.tag !== undefined && (
          <span className={`badge ${props.tag}`}>{`${props.tag}`}</span>
        )}

        <div className="imgWrapper">
          <img
            src="https://cushygarden.vn/wp-content/uploads/2021/07/DSCF5651-300x300.jpg"
            className="w-100"
          ></img>
          <div className="info">
            <span className="d-block catName">Snack</span>
            <h4 className="title">
              {/* Thêm đường dẫn vào Link để điều hướng */}
              <Link to={`/postdetails/${productId}`}>
                Seeds of Change Organic Quinoa, Brown, & Red Rice
              </Link>
            </h4>
            <span className="brand d-block text-g">
              By <Link className="text-g">NestFood</Link>
            </span>
            <div className="d-flex align-items-center mt-3">
              <div className="d-flex align-items-center">
                <span className="price text-g font-weight-bold">$28.85</span>
                <span className="oldPrice">$32.8</span>
                <Tooltip title="Add to cart" placement="top">
                  <Button className="bg-g ml-auto transition">
                    <ShoppingCartOutlined />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p className="time">
                <HistoryOutlined style={{ marginRight: 5, fontSize: 16 }} />
                14 hours ago
              </p>
              <p className="location">
                <LocationOnOutlined style={{ marginRight: 5, fontSize: 16 }} />
                Bắc Từ Liêm
              </p>
              <div className="savedLove">
                <Tooltip title="Add to favorites">
                  <FavoriteBorderOutlined style={{ marginLeft: 20 }} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
