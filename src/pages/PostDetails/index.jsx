import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../utils/axios-client";

const PostDetails = () => {
  const { id } = useParams();
  const [flowerPost, setFlowerPost] = useState(null);
  const [flowerRelativePost, setFlowerRelativePost] = useState(null);
  const [error, setError] = useState(null);
  const [relatedId, setRelatedId] = useState(null);
  const [relatedName, setRelatedName] = useState(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axiosClient.get(`/Post/${id}`);
        setFlowerPost(response.data);
        const relatedId = response.data.storeId == null ? response.data.sellerId : response.data.storeId
        setRelatedId(relatedId);
        if (response.data.store == null) {
          const relatedName = response.data.seller.fullName;
          setRelatedName(relatedName)
        } else {
          const relatedName = response.data.store.name;
          setRelatedName(relatedName)
        }
        if (relatedId) {
          fetchRelativeFlowers(relatedId);
        }
      } catch (error) {
        setError("Failed to fetch flowers");
        console.error(error);
      }
    };

    const fetchRelativeFlowers = async (relatedId) => {
      try {
        const response = await axiosClient.get(`/Post/store/${relatedId}`);
        setFlowerRelativePost(response.data);
      } catch (error) {
        setError("Failed to fetch related flowers");
        console.error(error);
      }
    };

    fetchFlowers();
  }, [id]);

  if (!flowerPost) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    quantity,
    location,
    expiredAt,
    postStatus,
    imageUrls,
    mainImageUrl,
    unitMeasure,
    flower,
  } = flowerPost;

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <a
                  data-fslightbox="mygallery"
                  className="rounded-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-type="image"
                  href={mainImageUrl}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={mainImageUrl}
                    alt={title}
                  />
                </a>
              </div>
              <div className="d-flex justify-content-center mb-3">
                {imageUrls.map((imgUrl, index) => (
                  <a
                    key={index}
                    data-fslightbox="mygallery"
                    className="border mx-1 rounded-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-type="image"
                    href={imgUrl}
                  >
                    <img
                      width={60}
                      height={60}
                      className="rounded-2"
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{title}</h4>
                <div className="mb-3">
                  <span className="h5">
                    {Math.floor(flower.price).toLocaleString()} VND
                  </span>
                  <span className="text-muted">/ {unitMeasure}</span>
                </div>
                <p>{description}</p>
                <div className="row">
                  <dt className="col-4">Quantity:</dt>
                  <dd className="col-8">{quantity}</dd>
                  <dt className="col-4">Flower name:</dt>
                  <dd className="col-8">{flower.name}</dd>
                  <dt className="col-4">Expired at:</dt>
                  <dd className="col-8">{new Date(expiredAt).toLocaleString()}</dd>
                  <dt className="col-4">Location:</dt>
                  <dd className="col-8">{location}</dd>
                  <dt className="col-4">Unit measure:</dt>
                  <dd className="col-8">{unitMeasure}</dd>
                  <dt className="col-4">Seller/Store:</dt>
                  <dd className="col-8"><Link to={`/post-shop/${relatedId}`} className="text-decoration-none">
                    {relatedName}
                  </Link></dd>
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
                        placeholder="1"
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
                <h5 className="mb-3">Additional Information</h5>
                {/* Here you can add more details about the product as needed */}
                <p>More information about the flower post can be added here.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="bg-white rounded-2 p-3 border">
                <h5 className="mb-3">Related Posts Store</h5>
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
                          <span className="text-muted">
                            {Math.floor(relatedPost.flower.price).toLocaleString()} VND
                          </span>
                        ) : (
                          <span className="text-muted">Price not available</span>
                        )}
                      </div>
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        Add
                      </a>
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

export default PostDetails;
