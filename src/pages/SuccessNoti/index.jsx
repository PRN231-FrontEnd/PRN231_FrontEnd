import React from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

const SuccessNoti = () => {
    const query = new URLSearchParams(window.location.search);
    const transactionStatus = query.get("vnp_TransactionStatus");

    const isSuccess = transactionStatus === "00";

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
                        <button className="btn btn-success" href="/">Go to homepage</button>
                    </div>
                ) : (
                    <div className="message-box _failed">
                        <i className="fa fa-times-circle" aria-hidden="true" />
                        <h2>Payment Failed</h2>
                        <p>Please try again later.</p>
                        <button className="btn btn-danger" href="/">Retry Payment</button>
                    </div>
                )}
            </div>
        </div>
    );
};


export default SuccessNoti;
