import "./style.css";
import { useLocation } from "react-router-dom";

const SuccessNoti = () => {
    const query = new URLSearchParams(useLocation().search);
    const transactionStatus = query.get("vnp_TransactionStatus");

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    {transactionStatus === "00" ? (
                        <div className="message-box _success">
                            <i className="fa fa-check-circle" aria-hidden="true" />
                            <h2>Your payment was successful</h2>
                            <p>
                                Thank you for your payment. We will <br />
                                be in contact with more details shortly.
                            </p>
                        </div>
                    ) : (
                        <div className="message-box _failed">
                            <i className="fa fa-times-circle" aria-hidden="true" />
                            <h2>Your payment failed</h2>
                            <p>Try again later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SuccessNoti;
