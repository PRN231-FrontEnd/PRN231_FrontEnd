import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './style.css';
import TransactionDetail from '../TransactionDetail/index';

const TransactionList = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://flowerexchange.azurewebsites.net/api/wallet/${accountId}/wallet-transaction`);
        setTransactions(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Không thể tải thông tin giao dịch.');
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
    transaction.toWallet?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackClick = () => {
    setSelectedTransaction(null);
  };

  const handleOpenPopup = (type) => {
    setTransactionType(type);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setAmount('');
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const endpoint = transactionType === 'withdraw'
        ? 'https://localhost:7246/withdraw'
        : 'https://localhost:7246/deposit';

      await axios.post(endpoint, { accountId, amount: parseFloat(amount) });
      alert(`${transactionType === 'withdraw' ? 'Rút tiền' : 'Nạp tiền'} thành công!`);
      handleClosePopup();
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  if (loading) {
    return <p className="loading-message">Đang tải thông tin giao dịch...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (transactions.length === 0) {
    return <p className="empty-message">Không có thông tin giao dịch nào.</p>;
  }

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
          <h3>Danh sách giao dịch</h3>
          {/* <input
            type="text"
            placeholder="Tìm kiếm theo tên giao dịch hoặc ví..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Tìm kiếm theo tên giao dịch hoặc ví"
          /> */}

          <div className="transaction-list-body">
            <div className="table-header">
              <span className="header-cell">Ngày Tạo</span>
              <span className="header-cell">Loại giao dịch</span>
              <span className="header-cell">Mô tả</span>
              <span className="header-cell">Người gữi</span>
              <span className="header-cell">Người nhận</span>
              <span className="header-cell">Trạng thái</span>
              <span className="header-cell">Giá tiền</span>
              <span className="header-cell">Chi tiết</span>
            </div>

            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className={`transaction ${transaction.type.toLowerCase()}`}>
                <span className="transaction-cell">{new Date().toLocaleDateString()}</span>
                <span className="transaction-cell">{transaction.type}</span>
                <span className="transaction-cell">{transaction.direction}</span>
                <span className="transaction-cell">{transaction.fromUserFullName || "Hệ thống"}</span>
                <span className="transaction-cell">{transaction.toUserFullName || "Hệ thống"}</span>
                <span className="transaction-cell">{transaction.status}</span>
                <span className="transaction-cell">{transaction.amount || 'N/A'}</span>
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
  accountId: PropTypes.string.isRequired,
};

export default TransactionList;
