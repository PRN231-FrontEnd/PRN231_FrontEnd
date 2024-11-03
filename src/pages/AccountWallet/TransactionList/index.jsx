// TransactionList.js
import React, { useState } from 'react';
import './style.css';
import TransactionDetail from '../TransactionDetail/index'; // Nhập component mới

const TransactionList = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.transactionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleBackClick = () => {
    setSelectedTransaction(null);
  };

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
            
            {filteredTransactions.map((transaction, index) => (
              <div key={index} className={`transaction ${transaction.type}`}>
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

export default TransactionList;
