import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axios-client"

const FlowerDetailPage = () => {
  const { id } = useParams();
  const [flowerPost, setFlowerPost] = useState(null);
  const [flowerRelativePost, setFlowerRelativePost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axiosClient.get(`/Post/${id}`);
        setFlowerPost(response.data);
        const storeId = response.data.store?.id;
        if (storeId) {
          fetchRelativeFlowers(storeId);
        }
      } catch (error) {
        setError("Failed to fetch flowers");
        console.error(error);
      }
    };

    const fetchRelativeFlowers = async (storeId) => {
      try {
        const response = await axiosClient.get(`/Post/store/${storeId}`);
        console.log(response.data)
        setFlowerRelativePost(response.data);
      } catch (error) {
        setError("Failed to fetch flowers");
        console.error(error);
      }
    };
    fetchFlowers();
  }, [axiosClient, id]);


  if (!flowerPost) {
    return <div>Loading...</div>;
  }

  const { title, description, quantity, location, expiredAt, postStatus, imageUrls, mainImageUrl, unitMeasure, store, flower } = flowerPost;


  return (

    <div>
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-type="image"
                  href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"
                >
                  <img
                    style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
                    className="rounded-4 fit"
                    src={mainImageUrl !== "string" ? mainImageUrl : "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"}
                    alt="Main Hoodie"
                  />
                </a>
              </div>
              <div className="d-flex justify-content-center mb-3">
                {["big1", "big2", "big3", "big4", "big"].map((img, index) => (
                  <a
                    key={index}
                    data-fslightbox="mygalley"
                    className="border mx-1 rounded-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-type="image"
                    href={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}.webp`}
                  >
                    <img
                      width={60}
                      height={60}
                      className="rounded-2"
                      src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}.webp`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {title}
                </h4>
                <div className="mb-3">
                  <span className="h5">{Math.floor(flower.price).toLocaleString()} VND</span>
                  <span className="text-muted">/ {unitMeasure}</span>
                </div>
                <p>
                  {description}
                </p>
                <div className="row">
                  <dt className="col-4">Quantity:</dt>
                  <dd className="col-8">{quantity}</dd>
                  <dt className="col-4">Flower name:</dt>
                  <dd className="col-8">{flower.name}</dd>
                  <dt className="col-4">Expired at:</dt>
                  <dd className="col-8">{expiredAt}</dd>
                  <dt className="col-4">Unit measure</dt>
                  <dd className="col-8">{unitMeasure}</dd>
                </div>
                <hr />
                <div className="row mb-4">
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div className="input-group mb-3" style={{ width: 170 }}>
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-addon1"
                        data-mdb-ripple-color="dark"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <input
                        type="text"
                        className="form-control text-center border border-secondary"
                        placeholder={14}
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        id="button-addon2"
                        data-mdb-ripple-color="dark"
                      >
                        <i className="fas fa-plus" />
                      </button>
                    </div>
                  </div>
                </div>
                <a href="#" className="btn btn-warning shadow-0">
                  Buy now
                </a>
                <a href="#" className="btn btn-primary shadow-0">
                  <i className="me-1 fa fa-shopping-basket" /> Add to cart
                </a>
                <a
                  href="#"
                  className="btn btn-light border border-secondary py-2 icon-hover px-3"
                >
                  <i className="me-1 fa fa-heart fa-lg" /> Save
                </a>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-8 mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                  {["Specification", "Warranty info", "Shipping info", "Seller profile"].map((tab, index) => (
                    <li className="nav-item d-flex" role="presentation" key={index}>
                      <a
                        className={`nav-link d-flex align-items-center justify-content-center w-100 ${index === 0 ? 'active' : ''}`}
                        id={`ex1-tab-${index + 1}`}
                        data-mdb-toggle="pill"
                        href={`#ex1-pills-${index + 1}`}
                        role="tab"
                        aria-controls={`ex1-pills-${index + 1}`}
                        aria-selected={index === 0}
                      >
                        {tab}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="tab-content" id="ex1-content">
                  <div
                    className="tab-pane fade show active"
                    id="ex1-pills-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                  >
                    <p>
                      With supporting text below as a natural lead-in to additional
                      content. Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat. Duis aute irure dolor in reprehenderit in voluptate
                      velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="row mb-2">
                      <div className="col-12 col-md-6">
                        <ul className="list-unstyled mb-0">
                          {["Some great feature name here", "Lorem ipsum dolor sit amet, consectetur", "Duis aute irure dolor in reprehenderit", "Optical heart sensor"].map((feature, index) => (
                            <li key={index}>
                              <i className="fas fa-check text-success me-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12 col-md-6 mb-0">
                        <ul className="list-unstyled">
                          {["Easy fast and very good", "Some great feature name here", "Modern style and design"].map((feature, index) => (
                            <li key={index}>
                              <i className="fas fa-check text-success me-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <table className="table border mt-3 mb-2">
                      <tbody>
                        {[
                          { label: "Display:", value: "13.3-inch LED-backlit display with IPS" },
                          { label: "Processor capacity:", value: "2.3GHz dual-core Intel Core i5" },
                          { label: "Camera quality:", value: "720p FaceTime HD camera" },
                          { label: "Port:", value: "USB-C, USB-A, HDMI" },
                        ].map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item.label}</th>
                            <td>{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="bg-white rounded-2 p-3 border">
                <h5 className="mb-3">Related posts store</h5>
                {flowerRelativePost?.length > 0 ? (
                  flowerRelativePost.map((relatedPost, index) => (
                    <div
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                      key={relatedPost.id}
                    >
                      <img
                        src={relatedPost.mainImageUrl || "https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"}
                        className="rounded-2"
                        alt={relatedPost.title}
                        style={{ width: "40%" }}
                      />
                      <div className="ms-3">
                        <h6 className="mb-1">{relatedPost.title}</h6>
                        {relatedPost.flower && relatedPost.flower.price !== undefined ? (
                          <span className="text-muted">{Math.floor(relatedPost.flower.price).toLocaleString()} VND</span>
                        ) : (
                          <span className="text-muted">Price not available</span>
                        )}
                      </div>
                      <a href="#" className="btn btn-outline-primary btn-sm">Add</a>
                    </div>
                  ))
                ) : (
                  <p>No related posts found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlowerDetailPage;
