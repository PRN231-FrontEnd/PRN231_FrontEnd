import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal'; // Import the Modal component
import './style.css';
import { format } from 'date-fns'; 

const AccountInfo = ({ avatarUrl, username, balance }) => {
    const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [isDepositModalOpen, setDepositModalOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const token = localStorage.getItem('token');

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      };

    const handleWithdraw = async () => {
        // Validate amount to ensure it's a positive number
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid withdrawal amount.');
            return;
        }
    
        try {
            const response = await fetch('https://flowerexchange.azurewebsites.net/api/wallet/withdraw', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add JWT to header
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ amount: parseInt(amount, 10) }), // Convert to number
            });
    
            if (!response.ok) {
                const responseText = await response.text(); // Read the response as text
                try {
                    const errorData = responseText ? JSON.parse(responseText) : {};
                    alert(`Withdrawal failed: ${errorData.message || 'Unknown error'}`);
                } catch (jsonError) {
                    alert('Withdrawal failed. Could not parse error response.');
                    console.error('Error parsing error response:', jsonError);
                }
                return;
            }
    
            const data = await response.json();
            alert(`Withdrawal successful: ${data.message}`);
            
            // Reload the page after successful withdrawal
            window.location.reload();
        } catch (error) {
            alert('An error occurred during withdrawal.');
            console.error('Error during withdrawal:', error);
        }
    };

    const handleDeposit = async () => {
        if (!amount || isNaN(amount) || amount <= 50000) {
            alert('Please enter a valid deposit amount.');
            return;
        }
    
        try {
            const response = await fetch('https://flowerexchange.azurewebsites.net/api/payment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add JWT to header
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ amount: parseInt(amount, 10) }), // Convert to number
            });
            
            if (response.ok) {
                const responseData = await response.text(); // Read response as text instead of JSON
                window.open(responseData, '_blank'); // Open the URL in a new tab
            } else {
                const errorData = await response.json();
                alert(`Deposit failed: ${errorData.message}`);
            }
        } catch (error) {
            alert('An error occurred during deposit.');
            console.error('Error during deposit:', error);
        }
        
        setDepositModalOpen(false); // Close modal after handling
    };

    const handleAmountChange = (event) => setAmount(event.target.value);

    return (
        <div className="account-info">
            {/* Avatar and Username */}
            <div className="user-header">
                <img src={avatarUrl} alt="Avatar" className="avatar" />
                <span className="username">{username}</span>
            </div>
            
            {/* Balance */}
            <div className="balance">Balance: {formatAmount(balance)}</div>

            {/* Buttons for Withdraw and Deposit */}
            <div className="button-container">
                <div className="button-wrapper">
                    <button className="button" onClick={() => setWithdrawModalOpen(true)} aria-label="Withdraw">Withdraw</button>
                </div>
                <div className="button-wrapper">
                    <button className="button" onClick={() => setDepositModalOpen(true)} aria-label="Deposit">Deposit</button>
                </div>
            </div>

            {/* Modal for Withdraw */}
            <Modal
                isOpen={isWithdrawModalOpen}
                onClose={() => setWithdrawModalOpen(false)}
                title="Enter Withdrawal Amount"
                onConfirm={handleWithdraw}
            >
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </Modal>
            
            {/* Modal for Deposit */}
            <Modal
                isOpen={isDepositModalOpen}
                onClose={() => setDepositModalOpen(false)}
                title="Enter Deposit Amount"
                onConfirm={handleDeposit}
            >
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </Modal>
        </div>
    );
};

// Prop Types for validation
AccountInfo.propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
};

export default AccountInfo;
