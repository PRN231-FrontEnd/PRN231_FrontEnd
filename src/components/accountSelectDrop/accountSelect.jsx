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

const handleLogout = () => {
  // Add your logout logic here
  console.log("Logging out...");
  localStorage.removeItem("token"); // Clear authentication token
  localStorage.removeItem("refreshToken"); // Clear refresh token
  localStorage.removeItem("decodedUser"); // Clear decoded user info
  window.location.href = "/login"; // Redirect to login page
};

const items = [
  {
    key: "1",
    label: "Orders",
    children: [
      { key: "11", icon: <ContainerOutlined />, label: "Buy Order" },
      { key: "12", icon: <ShoppingOutlined />, label: "Sell Order" },
    ],
  },
  {
    key: "2",
    label: "Utility",
    children: [
      { key: "21", icon: <BookOutlined />, label: "Saved Post" },
      { key: "22", icon: <LikeOutlined />, label: "Feedback From Me" },
    ],
  },
  {
    key: "3",
    label: "Post Services",
    children: [
      { key: "31", icon: <WalletOutlined />, label: "Your wallet" },
      { key: "32", icon: <HistoryOutlined />, label: "History Transaction" },
      { key: "33", icon: <ShopOutlined />, label: "Store/Dedicated Site" },
    ],
  },
  {
    key: "4",
    label: "Others",
    children: [
      { key: "41", icon: <SettingOutlined />, label: "Account Setting" },
      {
        key: "42",
        icon: <LogoutOutlined />,
        label: "Log Out",
        onClick: handleLogout,
      },
    ],
  },
];

function AccountSelectDrop() {
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    // Lấy decodedUser từ localStorage
    const storedUser = localStorage.getItem("decodedUser");
    if (storedUser) {
      const userObject = JSON.parse(storedUser); // Chuyển đổi chuỗi JSON thành object
      setAccountName(userObject.given_name); // Lấy given_name từ object
      console.log(accountName);
    }
  }, []);

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
