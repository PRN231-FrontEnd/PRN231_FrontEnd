import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FlowerDetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [flower, setFlower] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/flowers/${id}`)
      .then((response) => response.json())
      .then((data) => setFlower(data))
      .catch((error) => console.error("Error fetching flower:", error));
  }, [id]);

  if (!flower) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải
  }

  return (
    <div>
      <h1>{flower.flowerName}</h1>
      {/* <img src={flower.imageFlower} alt={flower.flowerName} /> */}
      <p>{flower.descriptionFlower}</p>
      <p>Price: {flower.price.toLocaleString()} VND</p>
    </div>
  );
};

export default FlowerDetailPage;
