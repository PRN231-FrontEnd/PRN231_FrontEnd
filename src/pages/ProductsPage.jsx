import React from "react";
import { Link } from "react-router-dom";
const ProductsPage = () => {
  const products = [
    // Ví dụ trang có 2 product
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];
  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
