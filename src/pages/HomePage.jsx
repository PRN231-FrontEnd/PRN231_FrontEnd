import React, { useEffect, useState } from "react";
import styles from "../HomePage.module.css";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";

const HomePage = () => {
  const [flowers, setFlowers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const axiosClient = useAxiosInterceptor();

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axiosClient.get("/Post");
        setFlowers(response.data);
      } catch (error) {
        setError("Failed to fetch flowers");
        console.error(error);
      }
    };
    fetchFlowers();
  }, [axiosClient]);

  const handleCardClick = (id) => {
    navigate(`/flowers/${id}`);
  };
  const handleImageError = (e) => {
    e.target.src = "https://i.quotev.com/b2gtjqawaaaa.jpg";
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
            key={flower.id}
            onClick={() => handleCardClick(flower.id)}
          >
            <div>
              <img
                src={flower.mainImageUrl}
                className={styles.cardImg}
                alt={flower.flowerName}
                onError={handleImageError}
              />
            </div>

            <div className="card-body">
              <h5 className="card-title small">{flower.title}</h5>
              <p className="card-text small">{flower.description}</p>
              {/* <p className="card-text">
                Location: {flower.location}
              </p> */}
              <p className="card-text small">
                Price: {flower.flower?.price ? `${Math.floor(flower.flower.price).toLocaleString()} VND` : "Price not available"}
              </p>
              {/* <p className="card-text">
                Quantity: {flower.quantity} {flower.unitMeasure}
              </p> */}
            </div>
          </div>
        ))}
      </div >
    </>
  );
};

export default HomePage;
