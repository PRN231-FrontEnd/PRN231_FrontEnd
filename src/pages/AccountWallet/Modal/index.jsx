import React from 'react';
import './style.css'; // Create a CSS file for modal styling

const Modal = ({ isOpen, onClose, title, onConfirm }) => {
    const [amount, setAmount] = React.useState('');

    const handleConfirm = () => {
        if (amount) {
            onConfirm(amount);
            setAmount(''); // Reset amount after confirming
            onClose(); // Close modal after confirming
        }
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>{title}</h2>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Nhập số tiền"
                    />
                    <button onClick={handleConfirm}>Xác nhận</button>
                    <button onClick={onClose}>Đóng</button>
                </div>
            </div>
        )
    );
};

export default Modal;
