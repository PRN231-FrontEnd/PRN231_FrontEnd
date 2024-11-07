// TransactionDetail.js
import React from 'react';
import './style.css'; // Nếu cần, bạn có thể thêm CSS cho TransactionDetail

const TransactionDetail = ({ transaction, onBack }) => {
  return (
    <div className="transaction-detail-container">
      <h4>Chi tiết giao dịch</h4>
      <p><strong>Tên giao dịch:</strong> {transaction.transactionName}</p>
      <p><strong>Ngày tạo:</strong> {transaction.date}</p>
      <p><strong>Người thực hiện:</strong> {transaction.executor}</p>
      <p><strong>Người nhận tiền:</strong> {transaction.receiver}</p>
      <p><strong>Giao dịch:</strong> {transaction.amount >= 0 ? 'Dương' : 'Âm'}</p>
      <p><strong>Loại giao dịch:</strong> {transaction.transactionType}</p>
      <p><strong>Trạng thái giao dịch:</strong> {transaction.status}</p>
      <p><strong>Khoản tiền giao dịch:</strong> {transaction.amount.toLocaleString()} VND</p>
      <button onClick={onBack}>Quay lại danh sách</button>
    </div>
  );
};

export default TransactionDetail;
