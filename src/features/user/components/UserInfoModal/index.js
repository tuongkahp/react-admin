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
  const { visible, onOk, onCancel, userInfo } = props
  console.log('userInfo2', userInfo)
  const handleOk = () => {
    if (onOk) onOk()
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  return (
    <Modal
      title="User information"
      width={530}
      visible={visible}
      onOk={handleOk}
      okText={userInfo ? 'Update' : 'Add'}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 8, }}
        wrapperCol={{ span: 16, }}
        layout="horizontal"
        initialValues={{ userInfo }}
      // initialValues={{ disabled: componentDisabled }}
      // onValuesChange={onFormLayoutChange}
      // disabled={componentDisabled}
      >
        {/* <Form.Item label="Form disabled" name="disabled" valuePropName="checked">
          <Checkbox>disabled</Checkbox>
        </Form.Item> */}
        <Form.Item label="Full name" name="fullName">
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

        {/* <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item> */}

        {/* <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item> */}
        {/* <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>

        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item> */}
        {/* <Form.Item label="Button">
          <Button>{userInfo ? 'Update' : 'Add'}</Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default UserInfoModal;