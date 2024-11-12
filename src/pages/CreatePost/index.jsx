import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../utils/axios-client";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Upload,
  Radio,
} from "antd";
import moment from "moment";
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreatePost = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [postType, setPostType] = useState("personal"); // Giá trị mặc định là cá nhân
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [storeError, setStoreError] = useState(false);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch categories from the API
    axios
      .get("https://flowerexchange.azurewebsites.net/api/Category")
      .then((response) => {
        // Filter active categories (status = 0)
        const activeCategories = response.data.filter(
          (category) => category.status === 0
        );
        setCategories(activeCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        message.error("Không thể tải danh mục");
      });

    // Fetch current user information
    axiosClient
      .get("https://flowerexchange.azurewebsites.net/api/account/current-user")
      .then((response) => {
        setUser(response.data);
        console.log("User data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        message.error("Error fetching user data");
      });
  }, []);

  // const handleUploadChange = ({ fileList }) => {
  //   setImageUrls(
  //     fileList.map((file) => (file.response ? file.response.url : file.url))
  //   );
  // };

  const handlePostTypeChange = (e) => {
    const selectedType = e.target.value;
    setPostType(selectedType);

    // Kiểm tra nếu chọn kiểu đăng là Cửa hàng và user tồn tại nhưng storeId là null
    if (selectedType === "store" && user && !user.storeId) {
      setStoreError(true);
    } else {
      setStoreError(false);
    }
  };
  const handleMainImageChange = ({ fileList }) =>
    setMainImageFile(fileList[0]?.originFileObj);

  const handleAdditionalImagesChange = ({ fileList }) =>
    setAdditionalImageFiles(
      fileList.slice(0, 4).map((file) => file.originFileObj)
    );

  const handleSubmit = async (values) => {
    if (postType === "store" && !user?.storeId) {
      message.error("Bạn cần tạo cửa hàng trước khi đăng dưới dạng Cửa hàng.");
      return;
    }

    // Upload main image
    let uploadedMainImageUrl = "";
    if (mainImageFile) {
      try {
        const formData = new FormData();
        formData.append("file", mainImageFile);

        const mainImageResponse = await axios.post(
          "https://flowerexchange.azurewebsites.net/api/media/upload",
          // "https://localhost:7246/api/media/upload",
          formData
        );
        uploadedMainImageUrl = mainImageResponse.data.uri;
      } catch (error) {
        console.error("Error uploading main image:", error);
        message.error("Không thể upload hình ảnh chính.");
        return;
      }
    }

    // Upload additional images
    const uploadedAdditionalImageUrls = [];
    for (const file of additionalImageFiles) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const additionalImageResponse = await axios.post(
          "https://flowerexchange.azurewebsites.net/api/media/upload",
          // "https://localhost:7246/api/media/upload",
          formData
        );
        uploadedAdditionalImageUrls.push(additionalImageResponse.data.uri);
      } catch (error) {
        console.error("Error uploading additional image:", error);
        message.error("Không thể upload hình ảnh phụ.");
        return;
      }
    }
    // Prepare post data
    const postData = {
      selectedCategoryId: values.categoryId,
      title: values.title,
      description: values.description,
      quantity: values.quantity,
      location: values.location,
      expiredAt: moment(values.expiredAt).utc().format(), // Chuyển về UTC và định dạng
      imageUrls: uploadedAdditionalImageUrls,
      unitMeasure: values.unitMeasure,
      mainImageUrl: uploadedMainImageUrl,
      sellerId: user.id,
      storeId: postType === "store" ? user.storeId : null,
      flower: {
        name: values.flower.name,
        price: values.flower.price,
        currency: 0,
      },
    };
    // Log post data
    console.log("Post Data to be submitted:", postData);
    try {
      // Gọi API để tạo bài viết
      console.log(postData);
      await axios.post(
        "https://flowerexchange.azurewebsites.net/Post",
        // "https://localhost:7246/Post",
        postData
      );

      message.success("Bài viết đã được tạo thành công!");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Không thể tạo bài viết.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "whitesmoke",
      }}
    >
      <h2>Tạo Bài Viết Mới</h2>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Tắt form
      </Checkbox>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        disabled={componentDisabled}
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Chọn Thể Loại"
          name="categoryId"
          rules={[{ required: true, message: "Vui lòng chọn thể loại!" }]}
        >
          <Select placeholder="Chọn thể loại">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <TextArea rows={4} placeholder="Nhập mô tả bài viết" />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <Input type="number" placeholder="Nhập số lượng" />
        </Form.Item>

        <Form.Item
          label="Đơn vị"
          name="unitMeasure"
          rules={[
            { required: true, message: "Vui lòng nhập đơn vị sản phẩm bán!" },
          ]}
        >
          <Input placeholder="Bó, bông, hộp,..." />
        </Form.Item>

        <Form.Item
          label="Địa điểm"
          name="location"
          rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
        >
          <Input placeholder="Nhập địa điểm" />
        </Form.Item>

        <Form.Item
          label="Ngày hết hạn"
          name="expiredAt"
          rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label={
            <>
              Upload ảnh chính <br />
              *Hiển thị chính
              <br />( tối đa 1 )
            </>
          }
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            maxCount={1}
            onChange={handleMainImageChange}
          >
            <Button icon={<PlusOutlined />}>Ảnh chính</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label={
            <>
              Upload ảnh phụ <br />( tối đa 4 )
            </>
          }
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            multiple
            maxCount={4}
            onChange={handleAdditionalImagesChange}
          >
            <Button icon={<PlusOutlined />}>Ảnh phụ</Button>
          </Upload>
        </Form.Item>

        {/* <Form.Item
          label="Hình ảnh chính"
          name="mainImageUrl"
          rules={[{ required: true, message: "Vui lòng nhập hình ảnh chính!" }]}
        >
          <Input placeholder="Nhập URL hình ảnh chính" />
        </Form.Item> */}

        {/* <Form.Item
          label="Người bán ID"
          name="sellerId"
          rules={[{ required: true, message: "Vui lòng nhập ID người bán!" }]}
        >
          <Input placeholder={`${user ? user.id : ""}`} disabled />
        </Form.Item>

        <Form.Item
          label="Cửa hàng ID"
          name="storeId"
          rules={[{ required: true, message: "Vui lòng nhập ID cửa hàng!" }]}
        >
          <Input
            placeholder={`${
              user && user.storeId ? user.storeId : "Chưa tạo cửa hàng"
            }`}
            disabled
          />
        </Form.Item> */}

        <Form.Item label="Thông tin hoa">
          <Form.Item
            label="Tên hoa"
            name={["flower", "name"]}
            rules={[{ required: true, message: "Vui lòng nhập tên hoa!" }]}
          >
            <Input placeholder="Nhập tên hoa" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name={["flower", "price"]}
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" placeholder="Nhập giá" />
          </Form.Item>

          <Form.Item label="Tiền tệ" name={["flower", "currency"]}>
            <Input placeholder="VND" disabled />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Kiểu đăng">
          <Radio.Group value={postType} onChange={handlePostTypeChange}>
            <Radio value="personal">Cá nhân</Radio>
            <Radio value="store">Cửa hàng</Radio>
          </Radio.Group>
          {storeError && (
            <div style={{ marginTop: "10px", color: "red" }}>
              Bạn chưa có cửa hàng.{" "}
              <Button
                type="link"
                onClick={() => (window.location.href = "/create-store")}
              >
                Tạo cửa hàng
              </Button>
            </div>
          )}
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Tạo Bài Viết
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
