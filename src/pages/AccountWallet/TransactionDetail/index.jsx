import React, { useEffect, useState } from 'react';
import './style.css';
import { format } from 'date-fns'; // you can also use other formatting libraries

const TransactionDetail = ({ transactionId, accountId, onBack }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`https://flowerexchange.azurewebsites.net/api/wallet-transaction/${transactionId}/user/${accountId}`);
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

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="transaction-detail-container">
      <h4>Transaction Details</h4>
      {transaction && (
        <div className="transaction-content">
          <div className="transaction-info">
            <p><strong>Transaction ID: </strong> {transaction.id}</p>
            <p><strong>Created At: </strong>{format(new Date(transaction.createAt), 'dd/MM/yyyy hh:mm')}</p>
            <p><strong>Transaction Type: </strong> {transaction.type}</p>
            <p><strong>Performed By:</strong> {transaction.fromUserFullName || "System"}</p>
            <p><strong>Recipient:</strong> {transaction.toUserFullName || "System"}</p>
            <p><strong>Status:</strong> {transaction.status}</p>
            <p><strong>Amount:</strong> {formatAmount(transaction.amount)}</p>
          </div>

          <div className="transaction-items">
            <h5>Item List</h5>
            {transaction.serviceOrder || transaction.flowerOrder ? (
              <ul>
                {transaction.serviceOrder && (
                  <li>
                    <p><strong>Item Name:</strong> {transaction.serviceOrder.BuyerName || "Post Service"}</p>
                    <p><strong>Quantity:</strong> {transaction.serviceOrder.quantity || 1}</p>
                    <p><strong>Price:</strong> {formatAmount(transaction.amount)}</p>
                  </li>
                )}
                {transaction.flowerOrder && (
                  <li>
                    <p><strong>Item Name:</strong> {transaction.flowerOrder.flower.name || "Flower name"}</p>
                    <p><strong>Quantity:</strong> {transaction.flowerOrder.quantity || 1}</p>
                    <p><strong>Price:</strong> {formatAmount(transaction.flowerOrder.flower.price)}</p>
                  </li>
                )}
              </ul>
            ) : (
              <p>No items in this transaction.</p>
            )}
          </div>
        </div>
      )}
      <button onClick={onBack}>Back to List</button>
    </div>
  );
};

export default TransactionDetail;
