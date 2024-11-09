import React, { useEffect, useState } from "react";
import './style.css';
import AccountInfo from './AccountInfo';
import TransactionList from './TransactionList';

function Wallet() {
    const [userId, setUserId] = useState(null);
    const [accountId, setAccountId] = useState(null);
    const [walletData, setWalletData] = useState(null); // State để lưu thông tin ví (balance)

    // Lấy JWT từ localStorage
    const token = localStorage.getItem('token');

    // Gọi API để lấy thông tin người dùng hiện tại
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('https://flowerexchange.azurewebsites.net/api/account/current-user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thêm JWT vào header
                    },
                });
                const data = await response.json();
                setUserId(data);      // Lưu userId
                setAccountId(data.id); // Lưu accountId để lấy lịch sử giao dịch
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };

        fetchCurrentUser();
    }, [token]);

    // Gọi API để lấy thông tin ví sau khi có userId
    useEffect(() => {
        if (userId) {
            const fetchWalletData = async () => {
                try {
                    const response = await fetch(`https://flowerexchange.azurewebsites.net/api/wallet/${userId.id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // Thêm JWT vào header
                        },
                    });
                    const data = await response.json();
                    setWalletData(data); // Lưu thông tin ví (bao gồm balance)
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin ví:", error);
                }
            };

            fetchWalletData();
        }
    }, [userId, token]);

    if (!walletData) {
        return <p>Loading wallet information...</p>;
    }

    return (
        <div className="container-wallet">
            {/* Section 1 (30%) */}
            <section className="section">
                <h2>Thông tin tài khoản</h2>
                <AccountInfo
                    avatarUrl={userId.profilePictureUrl || "https://via.placeholder.com/50"}  // Đường dẫn ảnh đại diện
                    username={userId.fullname || "Anonymous"}                        // Tên người dùng
                    balance={walletData.totalBalance || 0}                                    // Số dư tài khoản
                />
            </section>

            {/* Section 2 (70%) */}
            <section className="section">
                {accountId ? (
                    <TransactionList accountId={"5750a170-88a9-4b68-81a1-91bacca2546f"} />
                ) : (
                    <p>Loading transaction history...</p>
                )}
            </section>
        </div>
    );
}

export default Wallet;
