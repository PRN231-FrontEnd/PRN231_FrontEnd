import axios from "axios";

// Tạo instance của axios
const axiosClient = axios.create({
  baseURL: "https://flowerexchange.azurewebsites.net", // Base URL của API
});

// Hàm lấy và lưu token
const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setRefreshToken = (token) => localStorage.setItem("refreshToken", token);

// Hàm để gọi API refresh token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post("account/refresh-token", {
      accessToken: getToken(), // Thêm accessToken vào payload
      refreshToken: getRefreshToken(), // Thêm refreshToken vào payload
    });

    // Lưu accessToken và refreshToken mới vào localStorage
    setToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);

    return response.data.accessToken; // Trả về accessToken mới
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Điều hướng đến trang đăng nhập nếu refresh token thất bại
    return null;
  }
};

// Interceptor để thêm accessToken vào tất cả các request
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi 401 và refresh token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi là 401 (Unauthorized)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Đánh dấu rằng đã thử refresh token 1 lần
      const newToken = await refreshAccessToken(); // Lấy accessToken mới

      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`; // Cập nhật token trong header
        return axiosClient(originalRequest); // Thử lại request với accessToken mới
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
