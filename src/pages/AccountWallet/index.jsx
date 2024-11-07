import React from "react";
import './style.css';
import AccountInfo from './AccountInfo';
import TransactionList from './TransactionList';

const transactions = [
    {
      id: 1,
      transactionName: "Giao dịch A",
      date: "2024-10-01",
      executor: "User 1",
      receiver: "User 2",
      transactionType: "Mua dịch vụ", // hoặc "giao dịch mua bán hoa", "giao dịch đặt cọc"
      status: "Chờ thanh toán", // hoặc "giao dịch thành công", "giao dịch bị hủy"
      amount: 1000000, // Số tiền giao dịch
    },
    // Thêm các giao dịch khác...
  ];
  

function Wallet() {
    return (
        <div className="container-wallet">
            {/* Section 1 (30%) */}
            <section className="section">
                <h2>Thông tin tài khoản</h2>
                <AccountInfo
                    avatarUrl="https://via.placeholder.com/50"  // Đường dẫn ảnh đại diện
                    username="John Doe"                          // Tên người dùng
                    balance={1000000}                            // Số dư tài khoản (1.000.000 VND)
                />
            </section>

            {/* Section 2 (70%) */}
            <section className="section">
                <TransactionList transactions={transactions} />
            </section>
        </div>
    );
}

export default Wallet;