import React from "react";
import './style.css';
import AccountInfo from './AccountInfo';
import TransactionList from './TransactionList';

const transactions = [
    { date: '01/11/2024', description: 'Nạp tiền', amount: 500000, type: 'deposit', creator: 'John Doe', status: 'Thành công' },
    { date: '02/11/2024', description: 'Mua hoa', amount: -200000, type: 'withdrawal', creator: 'John Doe', status: 'Thành công' },
    { date: '03/11/2024', description: 'Nạp tiền', amount: 300000, type: 'deposit', creator: 'Jane Smith', status: 'Thành công' },
    { date: '04/11/2024', description: 'Rút tiền', amount: -150000, type: 'withdrawal', creator: 'John Doe', status: 'Thất bại' },
    // Thêm các giao dịch khác nếu cần
  ];

function Wallet() {
    return (

        <div className="container">
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