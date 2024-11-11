import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../utils/axios-client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flowerPost, setFlowerPost] = useState(null);
  const [flowerRelativePost, setFlowerRelativePost] = useState([]);
  const [error, setError] = useState(null);
  const [relatedId, setRelatedId] = useState(null);
  const [relatedName, setRelatedName] = useState(null);
  const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
  const userId = user.jti;

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axiosClient.get(`/Post/${id}`);
        setFlowerPost(response.data);

        const relatedId = response.data.storeId || response.data.sellerId;
        setRelatedId(relatedId);

        const relatedName = response.data.store
          ? response.data.store.name
          : response.data.seller?.fullName;
        setRelatedName(relatedName);

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

  const handleBuyNow = () => {
    navigate(`/Checkout-detail/${id}`);
  };

  const handleContact = async () => {
    if (!flowerPost) return;

    try {
      await axiosClient.post("https://flowerexchange.azurewebsites.net/Message", {
        content: `Cho tôi hỏi về sản phẩm ${flowerPost.title}`,
        senderId: userId,
        recipientId: flowerPost.sellerId,
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message.");
    }
  };

  if (!flowerPost) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    quantity,
    location,
    expiredAt,
    imageUrls = [],
    mainImageUrl,
    unitMeasure,
    flower,
    sellerId,
    postStatus,
    seller,
  } = flowerPost;

  const images = [
    { original: mainImageUrl, thumbnail: mainImageUrl },
    ...imageUrls.map((imgUrl) => ({
      original: imgUrl,
      thumbnail: imgUrl,
    })),
  ];

  const isContactDisabled = userId === sellerId;

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <ImageGallery items={images} showPlayButton={false} />
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="title text-dark">{title}</h4>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleContact}
                    hidden={isContactDisabled}
                  >
                    Contact with Us
                  </button>
                </div>
                <div className="mb-3">
                  <span className="h5">
                    {flower && flower.price
                      ? Math.floor(flower.price).toLocaleString()
                      : "Price not available"}{" "}
                    VND
                  </span>
                  <span className="text-muted">/ {unitMeasure}</span>
                </div>
                <p>{description}</p>
                <div className="row">
                  <dt className="col-4">Quantity:</dt>
                  <dd className="col-8">{quantity}</dd>
                  <dt className="col-4">Flower name:</dt>
                  <dd className="col-8">{flower?.name || "Not specified"}</dd>
                  <dt className="col-4">Expired at:</dt>
                  <dd className="col-8">{new Date(expiredAt).toLocaleString()}</dd>
                  <dt className="col-4">Location:</dt>
                  <dd className="col-8">{location}</dd>
                  <dt className="col-4">Unit measure:</dt>
                  <dd className="col-8">{unitMeasure}</dd>
                  <dt className="col-4">Seller/Store:</dt>
                  <dd className="col-8">
                    <Link to={`/post-shop/${relatedId}`} className="text-decoration-none">
                      {relatedName || "Unknown Store"}
                    </Link>
                  </dd>
                </div>
                <hr />
                <button hidden={postStatus === 1} onClick={handleBuyNow} className="btn btn-warning shadow-0">
                  Buy now
                </button>
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
                <p>More information about the flower post can be added here.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="bg-white rounded-2 p-3 border">
                <h5 className="mb-3">Related Posts Store</h5>
                {flowerRelativePost.length > 0 ? (
                  flowerRelativePost.map((relatedPost) => (
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
                        <span className="text-muted">
                          {relatedPost.flower && relatedPost.flower.price !== undefined
                            ? Math.floor(relatedPost.flower.price).toLocaleString()
                            : "Price not available"}
                        </span>
                      </div>
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        View Detail
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
