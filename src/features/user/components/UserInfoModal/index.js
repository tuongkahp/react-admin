import React from 'react';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const UserInfoModal = (props) => {
  const { visible, onCreate, onCancel, userInfo } = props
  const [form] = Form.useForm();
  const userInfo2 = {
    username: 'test1',
    fullName: 'test222'
  }
  console.log('userInfo2', userInfo)

  if (!userInfo?.userId)
    form.resetFields()

  // const handleOk = (userInfo) => {
  //   const form = this.form;
  //   form.validateFields((err, values) => {
  //     if (err) {
  //       return;
  //     }

  //     console.log('Received values of form: ', values);
  //     form.resetFields();
  //     this.setState({ visible: false });
  //   });
  //   if (onOk) onOk(userInfo)
  // }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  return (
    <Modal
      title="User information"
      width={530}
      visible={visible}
      okText={userInfo ? 'Update' : 'Add'}
      okButtonProps={{ htmlType: 'submit' }}
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
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
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={userInfo2}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input the username',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Full name"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Please input the full name',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name='email'>
          <Input />
        </Form.Item>

        <Form.Item label="Phone number" name='phoneNumber'>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name='password'>
          <Input />
        </Form.Item>

        <Form.Item label="Confirm password" name='confirmPassword'>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserInfoModal;