import React from "react";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams(); // Lấy ID của sản phẩm từ URL

  // Tùy vào id, bạn có thể fetch dữ liệu sản phẩm hoặc lấy từ một nguồn khác
  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
      {/* Hiển thị các thông tin khác của sản phẩm */}
    </div>
  );
}

export default PostDetails;
