import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  Typography,
  message,
  Card,
  Row,
  Col,
  Modal,
  UploadFile,
  GetProp,
  UploadProps,
  Image
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import axiosClient from "../../../utils/axios-client";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

interface StoreData {
  name: string;
  address: string;
  coverPhotoUrl: string;
  avatarUrl: string;
  descriptions: string;
  slug: string;
  phones: string[];
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const SetupStore: React.FC = () => {
  const [form] = Form.useForm();
  const [coverPhotoURL, setCoverPhotoURL] = useState<string | undefined>();
  const [avatarURL, setAvatarURL] = useState<string | undefined>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  
  const [messageUploadCoverPhoto, setMessageUploadCoverPhoto] = useState("Upload");
  const [messageUploadAvatar, setMessageUploadAvatar] = useState("Upload");

  const uploadImageToAPI = async (file: File, type: 'cover' | 'avatar'): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://flowerexchange.azurewebsites.net/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log(data);
      form.setFieldsValue({ [type === 'cover' ? 'coverPhotoUrl' : 'avatarUrl']: data.uri });
      message.success(`${file.name} uploaded successfully`);
      message.success(`URI IS ${data.uri}`);
     
      return data.uri;
    } catch (error) {
      message.error(`${file.name} upload failed.`);
      throw error;
    }
  };



  const handlePreview = async (file: UploadFile) => {
 
    console.log("HANDLE PREVIEW: ", file);
    console.log("FILE URL: ", file.url);
    console.log("FILE PREVIEW: ", file.preview);
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage((file.preview as string));
    setPreviewOpen(true);
  };



  const handleImageUpload = async (info: any, type: 'cover' | 'avatar') => {
    console.log("INFO: ", info);
    const { status, originFileObj: file } = info.file;
    console.log("STATUS: ", status);
    console.log("ORIGINAL FILE OBJECT: ", file);
    if (status === "done" && file) {
      try {
        const url = await uploadImageToAPI(file, type);
        if (type === 'cover') {
          console.log(url);
          setCoverPhotoURL(url);
          setMessageUploadCoverPhoto("Replace");
        } else {
          console.log(url);
          setAvatarURL(url);
          setMessageUploadAvatar("Replace");
        }
      } catch {
        message.error(`${file.name} upload failed.`);
      }
    }
  };

  const onFinish = async (values: StoreData) => {
    console.log("BODY STORE: ", values);
    try {
      // Send the store creation request
      const response = await axiosClient.post("/api/store", { storeCreateDTO: values });
  
      if (response.status === 200) {
        message.success('Store created successfully');
      } else {
        throw new Error('Failed to create store');
      }
    } catch (error: any) {
      // Check if error is an Axios error
      if (axios.isAxiosError(error)) {
        // Extract error details if available
        const errorMessage = error.response?.data?.detail || 'There was a problem setting up your store. Please try again.';
        message.error(errorMessage); // Display the error message from the server
      } else {
        message.error('There was a problem setting up your store. Please try again.');
      }
    }
  };
  
  
  

  const handleRemoveImage = (type: 'cover' | 'avatar') => {
    if (type === 'cover') {
      setCoverPhotoURL(undefined);
      form.setFieldsValue({ coverPhotoUrl: undefined });
      setMessageUploadCoverPhoto("Upload");
    } else {
      setAvatarURL(undefined);
      form.setFieldsValue({ avatarUrl: undefined });
      setMessageUploadAvatar("Upload");
    }
  };

  


  return (
    <Card style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Set Up Your Flower Store</Title>
      <Form
        form={form}
        name="setup-store"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Store Name"
              rules={[{ required: true, message: 'Please input your store name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input your store address!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="coverPhotoUrl"
              label="Cover Photo"
              rules={[{ required: true, message: 'Please upload a cover photo!' }]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                action="https://flowerexchange.azurewebsites.net/api/media/upload"
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }}
                onPreview={handlePreview}
                onRemove={() => handleRemoveImage('cover')}
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG file!');
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('Image must smaller than 5MB!');
                  }
                  return isJpgOrPng && isLt5M;
                }}
                onChange={(info) => handleImageUpload(info, 'cover')}
              >
                    <div>
  {messageUploadCoverPhoto !== "Replace" ? <PlusOutlined /> : <RetweetOutlined />}
  <div style={{ marginTop: 8 }}>
    {messageUploadCoverPhoto}
  </div>
</div>


    

              </Upload>
                                      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}

            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="avatarUrl"
              label="Avatar"
              rules={[{ required: true, message: 'Please upload an avatar!' }]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                action="https://flowerexchange.azurewebsites.net/api/media/upload"
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }}
                onPreview={handlePreview}
                onRemove={() => handleRemoveImage('avatar')}
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG file!');
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('Image must smaller than 5MB!');
                  }
                  return isJpgOrPng && isLt5M;
                }}
                onChange={(info) => handleImageUpload(info, 'avatar')}
              >
                   <div>
  {messageUploadAvatar !== "Replace" ? <PlusOutlined /> : <RetweetOutlined />}
  <div style={{ marginTop: 8 }}>
    {messageUploadAvatar}
  </div>
</div>
              </Upload>
                {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                     onVisibleChange: (visible) => setPreviewOpen(visible),
                     afterOpenChange: (visible) => !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
 

            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="descriptions"
          label="Description"
          rules={[{ required: true, message: 'Please input your store description!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="slug"
          label="Store Slug"
          rules={[{ required: true, message: 'Please input your store slug!.' }]}
        >
          <Input />
        </Form.Item>

        <Form.List name="phones">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  label={index === 0 ? 'Phone Numbers' : ''}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{ required: true, whitespace: true, message: "Please input phone number or delete this field." }]}
                    noStyle
                  >
                    <Input style={{ width: '60%' }} placeholder="Phone number" />
                  </Form.Item>
                  {fields.length > 1 && (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Phone Number
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Set Up Store
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SetupStore;
