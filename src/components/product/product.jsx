import "./product.css";
import { Button, Tooltip } from "@mui/material";
import {
  ShoppingCartOutlined,
  RemoveRedEyeOutlined,
  BookmarkAddOutlined,
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
          <span className="d-block catName">Flower</span>
          {/* <h4 className="title">
            <Link to={`/postdetails/${id}`}>{title}</Link>
          </h4> */}
          <h4 className="title">{title}</h4>

          <span className="brand d-block text-g description">{description}</span>
          <div className="d-flex align-items-center mt-3">
              <span className="price text-g font-weight-bold">
                ${price || "N/A"}
              </span>
              <Tooltip title="Save to view later" placement="top">
                <Button className="bg-g ms-auto transition">
                  <BookmarkAddOutlined />
                </Button>
              </Tooltip>
          </div>
          <div className="d-flex align-items-center">
            <p className="location">
              <LocationOnOutlined style={{ marginRight: 5, fontSize: 16 }} />
              {location}
            </p>
            {/* <div className="savedLove">
              <Tooltip title="Add to favorites">
                <FavoriteBorderOutlined style={{ marginLeft: 20 }} />
              </Tooltip>
            </div> */}
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
