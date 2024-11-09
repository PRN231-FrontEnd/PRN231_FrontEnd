import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Product from "../../components/product/product";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function ShopPage() {
    const { id: relatedId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [shopName, setShopName] = useState("");
    const [error, setError] = useState("");

    const hasFetched = useRef(false);

    const fetchData = async (page, query = "") => {
        if (loading) return;

        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                `https://flowerexchange.azurewebsites.net/Post/store/${relatedId}`,
                {
                    params: {
                        Title: query,
                        PageNumber: page,
                        PageSize: 10,
                    },
                }
            );

            setProducts((prevProducts) => [...prevProducts, ...response.data]);

            const storeName = response.data[0]?.store ? response.data[0].store.name : response.data[0]?.seller.fullName;
            setShopName(storeName);

            if (response.status === 500 || response.data.length === 0) {
                setError("Sản phẩm không được tìm thấy");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError("Sản phẩm không được tìm thấy");
            } else {
                console.error("Error fetching product data", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchData(currentPage, searchString);
            hasFetched.current = true;
        }
    }, [currentPage, searchString]);

    const handleSearch = () => {
        setProducts([]);
        setCurrentPage(1);
        fetchData(1, searchString);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        autoplay: 2000,
    };

    return (
        <>
            <section className="shopBanner" style={{ position: "relative", textAlign: "center" }}>
                <img
                    src="https://t4.ftcdn.net/jpg/02/32/16/07/360_F_232160763_FuTBWDd981tvYEJFXpFZtolm8l4ct0Nz.jpg"
                    alt="Shop Banner"
                    className="w-100"
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <div
                    className="bannerText"
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "75px",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "32px",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                    }}
                >
                    {shopName ? shopName + " Store" : "Shop Name"}
                </div>
            </section>

            <section className="homeProducts">
                <div className="container-fluid">
                    <div className="d-flex align-items-center nav-small">
                        <h2 className="hd mb-0 mt-0">Post Relative Shop</h2>
                        <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                            <TextField
                                label="Search by title"
                                variant="outlined"
                                fullWidth
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)}
                                style={{ marginRight: "10px", width: "300px" }}
                            />
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </div>
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="productRow">
                        {products.map((product) => (
                            <Link
                                to={`/post-details/${product.id}`}
                                key={uuidv4()}
                                className="item"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <Product
                                    id={product.id}
                                    tag={product.priority ? "best" : null}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                    location={product.location}
                                    imageUrl={product.mainImageUrl}
                                />
                            </Link>
                        ))}
                    </div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                        >
                            Load More
                        </Button>
                    )}
                </div>
            </section>

            {/* <section className="homeProducts homeProductsRow2 pt-0">
                <div className="container-fluid">
                    <div className="d-flex align-items-center nav-small">
                        <h2 className="hd mb-0 mt-0">Daily Best Sells</h2>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-md-3">
                            <div className="banner">
                                <img
                                    src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-4.png"
                                    className="w-100 bannerImg"
                                />
                                <div className="banner-text">
                                    <h2 className="mb-100">
                                        Bring nature <br /> into your <br /> home
                                    </h2>
                                    <Button
                                        className="button"
                                        variant="contained"
                                        color="success"
                                        style={{ backgroundColor: "#279a65" }}
                                        endIcon={<ArrowForward />}
                                    >
                                        Shop now
                                    </Button>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9 pr-5">
                            <Slider {...settings} className="prodSlider"></Slider>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}

export default ShopPage;
