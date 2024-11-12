import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const SuccessNoti = () => {
    const query = new URLSearchParams(window.location.search);
    const transactionStatus = query.get("vnp_TransactionStatus");
    const transactionId = query.get("vnp_TxnRef");
    const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
    const userId = user.jti;

    const isSuccess = transactionStatus === "00";
    const [transactionData, setTransactionData] = useState(null);


    useEffect(() => {
        const fetchTransactionDetails = async () => {
            try {
                const response = await axios.get(
                    `https://flowerexchange.azurewebsites.net/api/wallet-transaction/${transactionId}/user/${userId}`
                );
                setTransactionData(response.data);
            } catch (error) {
                console.error("Error fetching transaction details", error);
            }
        };

        if (isSuccess) {
            fetchTransactionDetails();
        }
    }, [isSuccess, transactionId, userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="notification-container">
            <div className="notification-box">
                {isSuccess ? (
                    <div className="message-box _success">
                        <i className="fa fa-check-circle" aria-hidden="true" />
                        <h2>Payment Successful</h2>
                        <p>
                            Thank you for your payment. We will <br />
                            be in contact with more details shortly.
                        </p>
                        {transactionData && (
                            <div className="transaction-details">
                                <p><strong>Transaction ID:</strong> {transactionData.id}</p>
                                <p><strong>Amount:</strong> {transactionData.amount.toLocaleString()} VNĐ</p>
                                <p><strong>Status:</strong> {transactionData.status}</p>
                                <p><strong>Recipient:</strong> {transactionData.toUserFullName}</p>
                                <p><strong>Date:</strong> {formatDate(transactionData.createAt)}</p>
                            </div>
                        )}
                        <button className="btn btn-success" onClick={() => window.location.href = "/"}>Go to homepage</button>
                    </div>
                ) : (
                    <div className="message-box _failed">
                        <i className="fa fa-times-circle" aria-hidden="true" />
                        <h2>Payment Failed</h2>
                        <p>Please try again later.</p>
                        <button className="btn btn-danger" onClick={() => window.location.href = "/"}>Retry Payment</button>
                    </div>
                )}
            </div>
        </div >
    );
};


export default SuccessNoti;
