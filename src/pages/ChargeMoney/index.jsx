import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography
} from "@mui/material";
import axiosClient from "../../utils/axios-client";

export default function ChargeMoney({ open, onClose }) {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleChargeSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const chargeAmount = parseFloat(amount);
        if (isNaN(chargeAmount) || chargeAmount <= 0) {
            setError("Please enter a valid amount greater than 0.");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
            const userId = user.jti;

            const response = await axiosClient.post(`/api/payment`, {
                userId,
                amount: chargeAmount,
            });
            console.log(response.data)
            if (response.data) {
                window.location.href = response.data;
            } else {
                setError("Failed to initiate payment. Please try again.");
            }
        } catch (error) {
            console.error("Error initiating payment", error);
            setError("Failed to initiate payment. Please try again.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Charge Money to Wallet</DialogTitle>
            <DialogContent>
                <form onSubmit={handleChargeSubmit}>
                    <TextField
                        label="Amount to Charge (VNĐ)"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleChargeSubmit} color="primary" variant="contained">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
