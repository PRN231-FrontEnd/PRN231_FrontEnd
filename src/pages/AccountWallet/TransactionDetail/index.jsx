import React, { useEffect, useState } from 'react';
import './style.css';

const TransactionDetail = ({ transactionId, accountId, onBack }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`https://localhost:7246/api/wallet-transaction/${transactionId}/user/${accountId}`);
        if (!response.ok) throw new Error('Failed to fetch transaction data');
        const data = await response.json();
        setTransaction(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, accountId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="transaction-detail-container">
      <h4>Chi tiết giao dịch</h4>
      {transaction && (
        <div className="transaction-content">
          <div className="transaction-info">
            <p><strong>Ngày Tạo: </strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Loại giao dịch: </strong> {transaction.type}</p>
            <p><strong>Mô tả: </strong> {transaction.direction}</p>
            <p><strong>Người thực hiện:</strong> {transaction.fromUserFullName || "Hệ thống"}</p>
            <p><strong>Người nhận tiền:</strong> {transaction.toUserFullName || "Hệ thống"}</p>
            <p><strong>Trạng thái:</strong> {transaction.status}</p>
            <p><strong>Giá tiền:</strong> {transaction.amount ? transaction.amount.toLocaleString() : 'N/A'} VND</p>
          </div>

          <div className="transaction-items">
            <h5>Danh sách vật phẩm</h5>
            {transaction.serviceOrder || transaction.flowerOrder ? (
              <ul>
                {transaction.serviceOrder && (
                  <li>
                    <p><strong>Tên vật phẩm:</strong> {transaction.serviceOrder.name}</p>
                    <p><strong>Số lượng:</strong> {transaction.serviceOrder.quantity}</p>
                    <p><strong>Giá:</strong> {transaction.serviceOrder.price.toLocaleString()} VND</p>
                  </li>
                )}
                {transaction.flowerOrder && (
                  <li>
                    <p><strong>Tên vật phẩm:</strong> {transaction.flowerOrder.name}</p>
                    <p><strong>Số lượng:</strong> {transaction.flowerOrder.quantity}</p>
                    <p><strong>Giá:</strong> {transaction.flowerOrder.price.toLocaleString()} VND</p>
                  </li>
                )}
              </ul>
            ) : (
              <p>Không có vật phẩm nào trong giao dịch này.</p>
            )}
          </div>
        </div>
      )}
      <button onClick={onBack}>Quay lại danh sách</button>
    </div>
  );
};

export default TransactionDetail;
