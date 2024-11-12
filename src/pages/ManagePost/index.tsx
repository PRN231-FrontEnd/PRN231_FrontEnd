import React, { useState, useEffect } from 'react';
import { Tabs, Card, Input, Select, Pagination, message, Spin, Image } from 'antd';
import { Button, TextField } from '@mui/material';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import "./style.css"

// Loại bài đăng
type Post = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  location: string;
  expiredAt: string;
  postStatus: number;
  mainImageUrl: string;
  flower: {
    name: string;
    price: number;
  };
};

// Tham số phân trang
type PaginateRequest = {
  currentPage: number;
  pageSize: number;
};

// Tiêu chí sắp xếp
type SortCriteria = {
  sortBy: string;
  isDescending: boolean;
};

// Tham số truyền vào hàm lấy bài đăng
type FetchPostsParams = {
  storeId?: string | null;
  sellerId: string;
  categories?: string[];
  searchString?: string;
  paginateRequest: PaginateRequest;
  sortCriterias: SortCriteria[];
};

// Hàm giả lập lấy bài đăng
// Update the fetchPosts function to handle the new response format

const fetchPosts = async (params: FetchPostsParams): Promise<{ posts: Post[]; }> => {
  try {
    console.log('Fetching posts with params:', params);
    const response = await fetch('https://flowerexchange.azurewebsites.net/Post/list-view-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Không thể tải bài đăng');
    }

    const data = await response.json(); // Assume API returns JSON

    // Check if the response data is an array, and assign posts directly
    const posts = Array.isArray(data) ? data : [];
    console.log('Fetched data:', posts); // Log fetched data

    return { posts}; // Return post array and its count
  } catch (error) {
    console.error('Lỗi khi lấy bài đăng:', error);
    return { posts: [] }; // Return empty array on error
  }
};

const { TabPane } = Tabs;
const { Option } = Select;

export default function PostManagement() {
  const [activeTab, setActiveTab] = useState<string>('store');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('descend');
  const [total, setTotal] = useState(0);

  const pageSize = 10;

  const [userId, setUserId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [accountId, setAccountId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
      const fetchCurrentUser = async () => {
          try {
              console.log('Fetching current user...');
              const response = await fetch('https://flowerexchange.azurewebsites.net/api/account/current-user', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                  },
              });
              const data = await response.json();
              console.log('Current user data:', data);  // Log the fetched user data
              setUserId(data.id);      
              setAccountId(data.id); 
              setStoreId(data.storeId);
          } catch (error) {
              console.error("Lỗi khi lấy thông tin người dùng:", error);
          }
      };

      fetchCurrentUser();
  }, [token]);

  useEffect(() => {
    console.log('Loading posts due to dependency change...');
    loadPosts();
  }, [activeTab, searchString, currentPage, sortBy, sortOrder]);

  const loadPosts = async () => {
    setLoading(true);
    console.log('Loading posts...');  // Log when loading starts

    // Bỏ qua yêu cầu nếu userId là null
    if (!userId) {
      message.error('Cần có ID người bán.');
      setLoading(false);
      return;
    }

    try {
      const params: FetchPostsParams = {
        storeId: activeTab === 'store' && storeId ? storeId : undefined, 
        sellerId: userId,
        searchString,
        paginateRequest: {
          currentPage,
          pageSize,
        },
        sortCriterias: [
          {
            sortBy,
            isDescending: sortOrder === 'descend',
          },
        ],
      };

      console.log('Params for loading posts:', params);  // Log the params for debugging

      const { posts: fetchedPosts } = await fetchPosts(params);
      
      if (fetchedPosts.length === 0) {
        message.info('Không có bài đăng.');
      }

      setPosts(fetchedPosts);
      setTotal(total);
      console.log('Loaded posts:', fetchedPosts);  // Log fetched posts data
    } catch (err) {
      message.error('Không thể tải bài đăng. Vui lòng thử lại.');
      console.error('Error loading posts:', err);  // Log errors
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log('Search initiated...');
    setCurrentPage(1);
    loadPosts();
  };

  const handleSortChange = (value: string) => {
    console.log('Sort order changed:', value);  // Log sort order change
    const [newSortBy, newSortOrder] = value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder as 'ascend' | 'descend');
  };

  const handleTabChange = (key: string) => {
    console.log('Tab changed to:', key);  // Log tab change
    setActiveTab(key);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý bài đăng của bạn</h1>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Bài đăng trong cửa hàng của bạn" key="store">
          <PostList
            posts={posts}
            loading={loading}
            searchString={searchString}
            setSearchString={setSearchString}
            handleSearch={handleSearch}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={total}
            pageSize={pageSize}
          />
        </TabPane>
        <TabPane tab="Bài đăng cá nhân" key="personal">
          <PostList
            posts={posts}
            loading={loading}
            searchString={searchString}
            setSearchString={setSearchString}
            handleSearch={handleSearch}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={total}
            pageSize={pageSize}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

type PostListProps = {
  posts: Post[];
  loading: boolean;
  searchString: string;
  setSearchString: (value: string) => void;
  handleSearch: () => void;
  sortBy: string;
  sortOrder: 'ascend' | 'descend';
  handleSortChange: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  total: number;
  pageSize: number;
};

function PostList({
  posts,
  loading,
  searchString,
  setSearchString,
  handleSearch,
  sortBy,
  sortOrder,
  handleSortChange,
  currentPage,
  setCurrentPage,
  total,
  pageSize,
}: PostListProps) {
  return (
    <div>
      <div className="d-flex align-items-center flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <TextField
            size="small"
            placeholder="Tìm kiếm bài đăng"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            variant="outlined"
          />
          <Button 
            variant="contained" 
            onClick={handleSearch} 
            startIcon={<SearchOutlined />} 
            sx={{ marginLeft: '10px' }}
          >
            Tìm kiếm
          </Button>
        </div>
        <Select
          style={{ width: 200, marginLeft: 50, height: 40}}
          value={`${sortBy}-${sortOrder}`}
          onChange={handleSortChange}
        >
          <Option value="createdAt-descend">Mới nhất</Option>
          <Option value="createdAt-ascend">Cũ nhất</Option>
        </Select>
      </div>

      <Spin spinning={loading}>
        <div className="row g-4 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="col-12 col-md-6 col-lg-4">
              <Card
                cover={
                  <Image
                    src={post.mainImageUrl}
                    alt={post.title}
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                  />
                }
                actions={[
                  <Button key="edit" variant="outlined" fullWidth>
                    Chỉnh sửa
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={post.title}
                  description={
                    <>
                      <p>{post.description.substring(0, 100)}...</p>
                      <p>Giá: {post.flower.price} VNĐ</p>
                    </>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      </Spin>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        className="mt-4"
      />
    </div>
  );
}
