import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../utils/axios-client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { message } from "antd";
import axios from "axios";

const PostUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flowerPost, setFlowerPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: 0,
    location: "",
    expiredAt: "",
    unitMeasure: "",
    flower: {
      name: "",
      price: 0,
      currency: 0,
    },
  });
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
        setFormData({
          id: id,
          title: response.data.title,
          description: response.data.description,
          quantity: response.data.quantity,
          location: response.data.location,
          expiredAt: response.data.expiredAt,
          unitMeasure: response.data.unitMeasure,
          flower: {
            name: response.data.flower?.name || "",
            price: response.data.flower?.price || 0,
            currency: response.data.flower?.currency || 0,
          },
        });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("flower.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        flower: { ...prev.flower, [fieldName]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axiosClient.put(`/Post`, {
        updatePost: formData,
      });
      message.success("Update post successfully!");
      navigate(`/post-details/${id}`); // Chuyển hướng sau khi cập nhật thành công
    } catch (error) {
      setError("Failed to update the post");
      console.error(error);
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
                  <dd className="col-8">{new Date(expiredAt).toISOString()}</dd>
                  <dt className="col-4">Location:</dt>
                  <dd className="col-8">{location}</dd>
                  <dt className="col-4">Unit measure:</dt>
                  <dd className="col-8">{unitMeasure}</dd>
                  <dt className="col-4">Seller/Store:</dt>
                  <dd className="col-8">
                    <Link
                      to={`/post-shop/${relatedId}`}
                      className="text-decoration-none"
                    >
                      {relatedName || "Unknown Store"}
                    </Link>
                  </dd>
                </div>
                <hr />
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-12 mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                <h3 className="mb-5">Update Information</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Expired At</label>
                    <input
                      type="datetime-local"
                      name="expiredAt"
                      value={formData.expiredAt}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Unit Measure</label>
                    <input
                      type="text"
                      name="unitMeasure"
                      value={formData.unitMeasure}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Flower Name</label>
                    <input
                      type="text"
                      name="flower.name"
                      value={formData.flower.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="flower.price"
                      value={formData.flower.price}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Post
                  </button>
                  {error && <div className="text-danger mt-3">{error}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostUpdate;
