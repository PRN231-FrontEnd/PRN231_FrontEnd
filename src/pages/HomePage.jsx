import React, { useEffect, useState } from "react";
import styles from "../HomePage.module.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axios-client";

const HomePage = () => {
  const [flowers, setFlowers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlowers = async (page) => {
      try {
        const response = await axiosClient.get(`/Post?PageNumber=${page}&PageSize=20`);
        console.log("Full API Response:", response);
        setFlowers(response.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        if (error.code === 'ECONNABORTED') {
          setError("Request timed out. Please try again.");
        } else {
          setError("Failed to fetch flowers");
        }
        console.error("Fetch error:", error);
      }
    };

    fetchFlowers(currentPage);
  }, [currentPage]);


  const handleCardClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleImageError = (e) => {
    e.target.src = "https://i.quotev.com/b2gtjqawaaaa.jpg";
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className={styles.poster}>
        <img src="../poster.jpg" className="card-img-top" alt="Poster" />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className={styles.postBody}>
        {flowers && flowers.length > 0 ? (
          flowers.map((flower) => (
            <div
              className={`card ${styles.card}`}
              style={{ width: "18rem" }}
              key={flower.id}
              onClick={() => handleCardClick(flower.id)}
            >
              <div>
                <img
                  src={flower.mainImageUrl || "https://i.quotev.com/b2gtjqawaaaa.jpg"}
                  className={styles.cardImg}
                  alt={flower.flowerName || "No Image"}
                  onError={handleImageError}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title small">{flower.title}</h5>
                <p className="card-text small">{flower.description}</p>
                <p className="card-text small">
                  Price: {flower.flower?.price ? `${Math.floor(flower.flower.price).toLocaleString()} VND` : "Price not available"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No flowers found</p>
        )}
      </div>

      <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HomePage;
