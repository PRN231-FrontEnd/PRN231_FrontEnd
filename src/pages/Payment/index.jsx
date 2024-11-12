import { useEffect, useState } from "react";
import axiosClient from "../../utils/axios-client";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ChargeMoney from "../ChargeMoney";
import { toast } from 'react-toastify';


export default function PaymentMethods() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [walletAmount, setWalletAmount] = useState(0);
    const [openChargeDialog, setOpenChargeDialog] = useState(false);
    const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
    const userId = user.jti;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await axiosClient.get(`/Post/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post data", error);
            }
        };

        const fetchWalletAmount = async () => {
            try {
                const response = await axiosClient.get(`/api/wallet/${userId}`);
                setWalletAmount(response.data.totalBalance);
            } catch (error) {
                console.error("Error fetching wallet amount", error);
            }
        };

        fetchPostDetail();
        fetchWalletAmount();
    }, [postId, userId]);

    const initiatePayment = async () => {
        try {
            const response = await axiosClient.post("/api/payment/flower-service", { postId });
            console.log("Payment successful:", response.data);
            toast.success('Payment successful!');
            navigate(`/user-profile/${userId}`);
        } catch (error) {
            console.error("Error initiating payment", error);
            toast.error("Payment failed. Please try again.");
        }
    };
    const remainingAmount = post ? walletAmount - (post.quantity * post.flower.price) : 0;

    return (
        <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    Cart - 1 item
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {post ? (
                                    <MDBRow>
                                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                            <MDBRipple rippleTag="div" rippleColor="light"
                                                className="bg-image rounded hover-zoom hover-overlay">
                                                <img src={post.mainImageUrl} className="w-100" alt={post.title} />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                                </a>
                                            </MDBRipple>
                                        </MDBCol>
                                        <MDBCol lg="5" md="6" className="mb-4 mb-lg-0">
                                            <p><strong>{post.title}</strong></p>
                                            <p>Description: {post.description}</p>
                                            <p>Quantity: <strong>{post.quantity}</strong></p>
                                        </MDBCol>
                                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                            <p className="text-start text-md-center">
                                                <strong>Total: {(post.quantity * post.flower.price).toLocaleString()} VNĐ</strong>
                                            </p>
                                        </MDBCol>
                                    </MDBRow>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <p><strong>We accept</strong></p>
                                <MDBCardImage className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                                <MDBCardImage className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                                <MDBCardImage className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                                <MDBCardImage className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png" alt="PayPal" />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBTypography tag="h5" className="mb-0">
                                    Summary
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup flush>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                       Your wallet balance
                                        <span><strong>{walletAmount.toLocaleString()} VNĐ</strong></span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Product Cost
                                        <span>{post ? `${(post.quantity * post.flower.price).toLocaleString()} VNĐ` : "0 VNĐ"}</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        Shipping
                                        <span>Free</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount have to pay</strong>
                                        </div>
                                        <span>
                                            <strong>
                                                {post ? `${((post.quantity * post.flower.price)).toLocaleString()} VNĐ` : "0 VNĐ"}
                                            </strong>
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>The additional amount needed for payment</strong>
                                        </div>
                                        <span>
                                            <strong>
                                                {post ? `${(walletAmount - (post.quantity * post.flower.price)).toLocaleString()} VNĐ` : "0 VNĐ"}
                                            </strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                                {remainingAmount >= 0 && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        onClick={initiatePayment}
                                    >
                                        Buy Now
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                    size="large"
                                    sx={{
                                        backgroundColor: "#ff9800",
                                        color: "white",
                                        marginTop: 1,
                                        '&:hover': {
                                            backgroundColor: "#e68900",
                                        },
                                    }}
                                    onClick={() => setOpenChargeDialog(true)}
                                >
                                    Charge money in wallet
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    fullWidth
                                    size="large"
                                    sx={{
                                        backgroundColor: "#f44336",
                                        color: "white",
                                        marginTop: 1,
                                        '&:hover': {
                                            backgroundColor: "#d32f2f",
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <ChargeMoney open={openChargeDialog} onClose={() => setOpenChargeDialog(false)} />
        </section>
    );
}
