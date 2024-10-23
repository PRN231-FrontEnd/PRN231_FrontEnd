// CreatePost.jsx

import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  message,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CreatePost = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
    // Giả lập gọi API để lưu bài viết
    message.success("Bài viết đã được tạo thành công!");
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
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input placeholder="Nhập tiêu đề bài viết" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
        >
          <TextArea rows={4} placeholder="Nhập nội dung bài viết" />
        </Form.Item>

        <Form.Item label="Chọn ngày" name="date">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Upload ảnh"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <Button icon={<PlusOutlined />}>Tải lên</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Chọn thể loại" name="category">
          <Select>
            <Select.Option value="news">Tin tức</Select.Option>
            <Select.Option value="tutorial">Hướng dẫn</Select.Option>
            <Select.Option value="review">Đánh giá</Select.Option>
          </Select>
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
