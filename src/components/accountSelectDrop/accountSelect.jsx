import React, { useState, useEffect } from "react";
import {
  SettingOutlined,
  ContainerOutlined,
  WalletOutlined,
  ShoppingOutlined,
  ShopOutlined,
  BookOutlined,
  LikeOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";

const handleLogout = () => {
  // Add your logout logic here
  console.log("Logging out...");
  localStorage.removeItem("token"); // Clear authentication token
  localStorage.removeItem("refreshToken"); // Clear refresh token
  localStorage.removeItem("decodedUser"); // Clear decoded user info
  window.location.href = "/login"; // Redirect to login page
};

function AccountSelectDrop() {
  const [accountName, setAccountName] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
  const userId = user.jti;

  useEffect(() => {
    // Lấy decodedUser từ localStorage
    const storedUser = localStorage.getItem("decodedUser");
    console.log(localStorage.getItem("decodedUser")?.jti)
    console.log(userId)

    if (storedUser) {
      const userObject = JSON.parse(storedUser); // Chuyển đổi chuỗi JSON thành object
      setAccountName(userObject.given_name); // Lấy given_name từ object
      console.log(accountName);
    }
  }, []);

  const items = [
  
    {
      key: "3",
      label: "Post Services",
      children: [
        { key: "31", icon: <WalletOutlined />, label: "Your wallet",  onClick: () => navigate(`/wallet`) },
      ],
    },
    {
      key: "4",
      label: "Others",
      children: [
        {
          key: "41",
          icon: <SettingOutlined />,
          label: "Account Setting",
          onClick: () => navigate(`/user-profile/${userId}`),
        },
        {
          key: "42",
          icon: <LogoutOutlined />,
          label: "Log Out",
          onClick: handleLogout,
        },
      ],
    },
  ];



  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
        },
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space style={{ color: "#000000", width: 150 }}>
            {accountName || "Guest"} {/* Hiển thị tên tài khoản */}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </ConfigProvider>
  );
}

export default AccountSelectDrop;
