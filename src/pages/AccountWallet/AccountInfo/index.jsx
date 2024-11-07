import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal'; // Import the Modal component
import './style.css';

const AccountInfo = ({ avatarUrl, username, balance }) => {
    const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [isDepositModalOpen, setDepositModalOpen] = useState(false);

    const handleWithdraw = async (amount) => {
        try {
            const response = await fetch('https://api.example.com/withdraw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parseInt(amount, 10) }), // Convert to number
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Withdrawal successful: ${data.message}`);
            } else {
                alert(`Withdrawal failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during withdrawal:', error);
        }
    };

    const handleDeposit = async (amount) => {
        try {
            const response = await fetch('https://api.example.com/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: parseInt(amount, 10) }), // Convert to number
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Deposit successful: ${data.message}`);
            } else {
                alert(`Deposit failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during deposit:', error);
        }
    };

    return (
        <div className="account-info">
            {/* Avatar và Username trên cùng một dòng */}
            <div className="user-header">
                <img src={avatarUrl} alt="Avatar" className="avatar" />
                <span className="username">{username}</span>
            </div>
            
            {/* Balance */}
            <div className="balance">Số dư: {balance.toLocaleString()} VND</div>

            {/* Nút Rút tiền và Nạp tiền */}
            <div className="button-container">
                <div className="button-wrapper">
                    <button className="button" onClick={() => setWithdrawModalOpen(true)} aria-label="Rút tiền">Rút tiền</button>
                </div>
                <div className="button-wrapper">
                    <button className="button" onClick={() => setDepositModalOpen(true)} aria-label="Nạp tiền">Nạp tiền</button>
                </div>
            </div>

            {/* Modal for Withdraw */}
            <Modal
                isOpen={isWithdrawModalOpen}
                onClose={() => setWithdrawModalOpen(false)}
                title="Nhập số tiền rút"
                onConfirm={handleWithdraw}
            />
            
            {/* Modal for Deposit */}
            <Modal
                isOpen={isDepositModalOpen}
                onClose={() => setDepositModalOpen(false)}
                title="Nhập số tiền nạp"
                onConfirm={handleDeposit}
            />
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
