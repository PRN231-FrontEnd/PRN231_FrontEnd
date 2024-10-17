import React, { useState } from 'react';
import { SettingOutlined, ContainerOutlined, WalletOutlined, ShoppingOutlined, ShopOutlined, BookOutlined, LikeOutlined, HistoryOutlined, LogoutOutlined} from '@ant-design/icons';
import { Button, ConfigProvider, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
  {
    key: '1',
    label: 'Orders',
    children: [
      {
        key: '11',
        icon: <ContainerOutlined />,
        label: 'Buy Order',
      },
      {
        key: '12',
        icon: <ShoppingOutlined />,
        label: 'Sell Order',
      },
    ],
  },
  {
    key: '2',
    label: 'Utility',
    children: [
      {
        key: '21',
        icon: <BookOutlined />,
        label: 'Saved Post',
      },
      {
        key: '22',
        icon: <LikeOutlined />,
        label: 'Feedback From Me',
      },
      // {
      //   key: '23',
      //   label: 'Submenu',
      //   children: [
      //     {
      //       key: '231',
      //       label: 'Option 1',
      //     },
      //     {
      //       key: '232',
      //       label: 'Option 2',
      //     },
      //     {
      //       key: '233',
      //       label: 'Option 3',
      //     },
      //   ],
      // },
      // {
      //   key: '24',
      //   label: 'Submenu 2',
      //   children: [
      //     {
      //       key: '241',
      //       label: 'Option 1',
      //     },
      //     {
      //       key: '242',
      //       label: 'Option 2',
      //     },
      //     {
      //       key: '243',
      //       label: 'Option 3',
      //     },
      //   ],
      // },
    ],
  },
  {
    key: '3',
    label: 'Post Services',
    children: [
      {
        key: '31',
        icon: <WalletOutlined />,
        label: 'Your wallet',
      },
      {
        key: '32',
        icon: <HistoryOutlined />,
        label: 'History Transaction',
      },
      {
        key: '33',
        icon: <ShopOutlined />,
        label: 'Store/Dedicated Site',
      },
    ],
  },
  {
    key: '4',
    label: 'Others',
    children: [
      {
        key: '41',
        icon:  <SettingOutlined />,
        label: 'Account Setting',
      },
      {
        key: '42',
        icon: <LogoutOutlined />,
        label: 'Log Out',
      },
    ],
  },
];
// const getLevelKeys = (items1) => {
//   const key = {};
//   const func = (items2, level = 1) => {
//     items2.forEach((item) => {
//       if (item.key) {
//         key[item.key] = level;
//       }
//       if (item.children) {
//         func(item.children, level + 1);
//       }
//     });
//   };
//   func(items1);
//   return key;
// };
// const levelKeys = getLevelKeys(items);

function AccountSelectDrop(props) {
  return (
    <ConfigProvider
    theme={{
      token: {
        fontSize: 16,
       
      }
    }}
    >
        <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{color: "#000000", width: 150}}>  
                Account Name
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
    </ConfigProvider>
    
  );
}
export default AccountSelectDrop;