import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Modal = ({ isOpen, onClose, title, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Xác nhận</button>
                    <button className="modal-button close" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default Modal;
