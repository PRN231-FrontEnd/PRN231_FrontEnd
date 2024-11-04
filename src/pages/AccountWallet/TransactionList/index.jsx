// TransactionList.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Import axios for making API requests
import './style.css';
import TransactionDetail from '../TransactionDetail/index'; // Import the new component

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://api.example.com/transactions'); // Replace with your API endpoint
        setTransactions(response.data); // Set the transactions state
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Không thể tải thông tin giao dịch.'); // Set the error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array to run only on mount

  const filteredTransactions = transactions.filter(transaction =>
    transaction.transactionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackClick = () => {
    setSelectedTransaction(null);
  };

  if (loading) {
    return <p className="loading-message">Đang tải thông tin giao dịch...</p>; // Show loading message
  }
  
  if (error) {
    return <p className="error-message">{error}</p>; // Show error message if there's an error
  }
  
  if (transactions.length === 0) {
    return <p className="empty-message">Không có thông tin giao dịch nào.</p>; // Show message if no transactions
  }

  return (
    <div className="transaction-list">
      {selectedTransaction ? (
        <TransactionDetail transaction={selectedTransaction} onBack={handleBackClick} />
      ) : (
        <>
          <h3>Danh sách giao dịch</h3>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên giao dịch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Tìm kiếm theo tên giao dịch"
          />

          <div className="transaction-list-body">
            <div className="table-header">
              <span className="header-cell">Tên giao dịch</span>
              <span className="header-cell">Ngày tạo</span>
              <span className="header-cell">Người thực hiện</span>
              <span className="header-cell">Người nhận tiền</span>
              <span className="header-cell">Loại giao dịch</span>
              <span className="header-cell">Trạng thái</span>
              <span className="header-cell">Khoản tiền (VND)</span>
              <span className="header-cell">Chi tiết</span>
            </div>
            
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className={`transaction ${transaction.transactionType}`}>
                <span className="transaction-cell">{transaction.transactionName}</span>
                <span className="transaction-cell">{transaction.date}</span>
                <span className="transaction-cell">{transaction.executor}</span>
                <span className="transaction-cell">{transaction.receiver}</span>
                <span className="transaction-cell">{transaction.transactionType}</span>
                <span className="transaction-cell">{transaction.status}</span>
                <span className="transaction-cell">{transaction.amount.toLocaleString()}</span>
                <span className="transaction-cell">
                  <button onClick={() => handleDetailClick(transaction)}>
                    Chi tiết
                  </button>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Ensure you have a unique identifier
      transactionName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      executor: PropTypes.string.isRequired,
      receiver: PropTypes.string.isRequired,
      transactionType: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionList;
