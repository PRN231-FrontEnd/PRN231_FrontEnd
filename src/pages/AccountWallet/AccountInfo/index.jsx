import React from 'react';
import './style.css';

const AccountInfo = ({ avatarUrl, username, balance }) => {
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
            <button className="button">Rút tiền</button>
          </div>
          <div className="button-wrapper">
            <button className="button">Nạp tiền</button>
          </div>
        </div>
      </div>
    );
  };

  
export default AccountInfo;
