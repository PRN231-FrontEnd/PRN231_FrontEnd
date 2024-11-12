import "./product.css";
import { Button, Tooltip } from "@mui/material";
import {
  ShoppingCartOutlined,
  LocationOnOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Product({ id, tag, title, description, price, location, imageUrl }) {
  return (
    <div className="productThumb">
      {tag && <span className={`badge ${tag}`}>{tag}</span>}
      <div className="imgWrapper">
        <img
          src={imageUrl || "default-image.jpg"}
          className="w-100"
          alt={title}
        />
        <div className="info">
          {/* <span className="d-block catName">Flower</span> */}
          {/* <h4 className="title">
            <Link to={`/postdetails/${id}`}>{title}</Link>
          </h4> */}
          <h4 className="title truncate">{title}</h4>

          <span className="brand truncate d-block text-g">{description}</span>
                    <div className="d-flex align-items-center mt-3">
            <div className="d-flex align-items-center">
              <span className="price text-g font-weight-bold">
                {`${price}` || "N/A"}  
              </span>
              {/* <Tooltip title="Add to cart" placement="top">
                <Button className="bg-g ml-0 transition">
                  <ShoppingCartOutlined />
                </Button>
              </Tooltip> */}
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="location">
              <LocationOnOutlined style={{ marginRight: 5, fontSize: 16 }} />
              {location}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number,
  location: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Product;
