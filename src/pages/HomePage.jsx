import React from "react";
import logo from "../logo.svg";
import styles from "./HomePage.module.css"; // Import CSS module
const HomePage = () => {
  return (
    <>
      <div className={styles.poster}>
        <img src="../poster.jpg" className="card-img-top" alt="..." />
      </div>
      <div className={styles.postBody}>
        <div className="card" style={{ width: "18rem" }}>
          <img src="../poster.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
