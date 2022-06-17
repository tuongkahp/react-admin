import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Modal,
} from 'antd';
import { userApi } from 'apis/userApi';

const UserInfoModal = ({ visible, onCreate, onCancel, userId }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!userId) {
      return
    }

    const getUserDetail = async () => {
      let getUserDetailResult = await userApi.getDetail(userId)
      if (getUserDetailResult.status)
        form.setFieldsValue(getUserDetailResult.data)
    }

    getUserDetail()
  })

  useEffect(() => {
    form.resetFields()
  }, [visible])

  return (
    <Modal
      visible={visible}
      maskClosable={false}
      title="User information"
      width={530}
      okText={userId ? 'Update' : 'Add'}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        labelAlign='left'
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input the username'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Full name"
          name="fullName"
          rules={[{
            required: true,
            message: 'Please input the full name'
          }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input the email',
            },
            {
              type: 'email',
              message: 'Email is invalid'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name='phoneNumber'
          rules={[
            {
              required: true,
              message: 'Please input the phone number',
            },
            {
              type: 'email'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name='password'
          rules={[
            {
              required: true,
              message: 'Please input the password',
            }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: 'Please input the confirm password',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            })
          ]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserInfoModal;