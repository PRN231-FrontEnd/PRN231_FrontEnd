import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css"; // Import CSS module
import { useNavigate } from "react-router-dom";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
const HomePage = () => {
  const [flowers, setFlowers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/flowers")
      .then((response) => response.json())
      .then((data) => setFlowers(data)) // <-- No need to access data.flowers
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(flowers); // This should now log the array of flowers.
  const handleCardClick = (id) => {
    navigate(`/flowers/${id}`); // Điều hướng đến trang chi tiết của flower
  };
  const handleImageError = (e) => {
    e.target.src = "https://i.quotev.com/b2gtjqawaaaa.jpg"; // Ảnh dự phòng
  };
  return (
    <>
      <div className={styles.poster}>
        <img src="../poster.jpg" className="card-img-top" alt="Poster" />
      </div>
      <div className={styles.postBody}>
        {flowers.map((flower) => (
          <div
            className={`card ${styles.card}`}
            style={{ width: "18rem" }}
            key={flower.id} // Lưu ý: Bạn cần một trường `id` duy nhất
            onClick={() => handleCardClick(flower.id)} // Điều hướng khi click
          >
            <div>
              <img
                src={flower.imageFlower}
                className={styles.cardImg}
                alt={flower.flowerName}
                onError={handleImageError} // Gọi hàm xử lý khi ảnh lỗi
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">{flower.flowerName}</h5>
              <p className="card-text">{flower.descriptionFlower}</p>
              <p className="card-text">
                Price: {flower.price.toLocaleString()} VND
              </p>
            </div>
          </div>
        ))}
      </div >
    </>
  );
};

export default HomePage;
