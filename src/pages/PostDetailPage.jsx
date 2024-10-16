import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FlowerDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [flowerPost, setFlowerPost] = useState(null);

  useEffect(() => {
    // Fetch dữ liệu từ API
    fetch(`https://flowerexchange.azurewebsites.net/Post/${id}`)
      .then((response) => response.json())
      .then((data) => setFlowerPost(data))
      .catch((error) => console.error("Error fetching flower post:", error));
  }, [id]);

  if (!flowerPost) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải
  }

  const { title, description, quantity, location, expiredAt, postStatus, imageUrls, mainImageUrl, unitMeasure, store, flower } = flowerPost;

  return (
    <div>
      <div className="box">
      <h1>{title}</h1>
      <p>Description: {description}</p>
      <p>Quantity: {quantity}</p>
      <p>Location: {location}</p>
      <p>Expires on: {new Date(expiredAt).toLocaleDateString()}</p>
      <p>Status: {postStatus === 0 ? "Active" : "Inactive"}</p>
      <p>Unit: {unitMeasure}</p>
      {mainImageUrl && <img src={mainImageUrl} alt={title} style={{ width: "200px" }} />}
      </div>
      <div className="box">
      <h2>Store Information</h2>
      <p>Store Name: {store.name}</p>
      <p>Address: {store.address}</p>
      </div>
      <div className="box">
      <h2>Flower Information</h2>
      <p>Name: {flower.name}</p>
      <p>Price: {flower.price.toLocaleString()} VND</p>
      <p>Currency: {flower.currency === 0 ? "VND" : "Other"}</p>

      {imageUrls.length > 0 && (
        <div>
          <h3>Additional Images</h3>
          {imageUrls.map((url, index) => (
            url && <img key={index} src={url} alt={`Flower Image ${index + 1}`} style={{ width: "100px", marginRight: "10px" }} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default FlowerDetailPage;
