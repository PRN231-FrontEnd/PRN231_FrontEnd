import React from "react";
import { useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL

  return (
    <div>
      <h1>Product Detail Page</h1>
      {/* Hiển thị thông tin chi tiết của sản phẩm theo ID */}
      <p>Product ID: {id}</p>
    </div>
  );
};

export default ProductDetailPage;
