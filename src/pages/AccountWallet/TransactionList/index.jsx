import React, { useState } from 'react';
import './style.css';

const TransactionList = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách giao dịch theo từ khóa tìm kiếm
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transaction-list">
      <h3>Danh sách giao dịch</h3>
      
      {/* Trường tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo mô tả..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <ul>
        {filteredTransactions.map((transaction, index) => (
          <li key={index} className={`transaction ${transaction.type}`}>
            <span>{transaction.date}</span>
            <span>{transaction.description}</span>
            <span>{transaction.creator}</span>
            <span>{transaction.amount.toLocaleString()} VND</span>
            <span>{transaction.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
