import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './style.css';
import TransactionDetail from '../TransactionDetail/index';
import { format } from 'date-fns';

const TransactionList = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);  // Number of items per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://flowerexchange.azurewebsites.net/api/wallet/${accountId}/wallet-transaction?OrderBy=CreatedAt%20desc`);
        setTransactions(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Unable to load transaction data.');
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchTransactions();
    }
  }, [accountId]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.fromWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.toWallet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.fromUserFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.toUserFullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages calculation
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackClick = () => {
    setSelectedTransaction(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p className="loading-message">Loading transaction data...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (transactions.length === 0) {
    return <p className="empty-message">No transaction data available.</p>;
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="transaction-list">
      {selectedTransaction ? (
        <TransactionDetail
          transactionId={selectedTransaction.id}
          accountId={accountId}
          onBack={handleBackClick}
        />
      ) : (
        <>
          <h3>Transaction List</h3>

          <div className="transaction-list-body">
            <div className="table-header">
              <span className="header-cell-no">#</span>
              <span className="header-cell">Transaction ID</span>
              <span className="header-cell">Created At</span>
              <span className="header-cell">Transaction Type</span>
              <span className="header-cell">Sender</span>
              <span className="header-cell">Receiver</span>
              <span className="header-cell">Status</span>
              <span className="header-cell">Amount</span>
              <span className="header-cell">Details</span>
            </div>

            {currentTransactions.map((transaction, index) => (
              <div key={transaction.id} className={`transaction ${transaction.type.toLowerCase()}`}>
                <span className="transaction-cell-no">{index + 1}</span> {/* Item index */}
                <span className="transaction-cell">{transaction.id}</span>
                <span className="transaction-cell">
                  {format(new Date(transaction.createAt), 'dd/MM/yyyy')}
                </span>
                <span className="transaction-cell">{transaction.type}</span>
                <span className="transaction-cell">{transaction.fromUserFullName || "System"}</span>
                <span className="transaction-cell">{transaction.toUserFullName || "System"}</span>
                <span className="transaction-cell">{transaction.status}</span>
                <span className="transaction-cell">
                  {transaction.direction === 'Plus' ? `+${formatAmount(transaction.amount)}` :
                    transaction.direction === 'Minus' ? `-${formatAmount(transaction.amount)}` : formatAmount(transaction.amount)}
                </span>
                <span className="transaction-cell">
                  <button onClick={() => handleDetailClick(transaction)}>
                    Details
                  </button>
                </span>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  accountId: PropTypes.string.isRequired,
};

export default TransactionList;
