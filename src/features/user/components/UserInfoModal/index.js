import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Modal,
  TreeSelect
} from 'antd';
import { userApi } from 'apis/userApi';
import { t } from 'i18next';

const { SHOW_PARENT } = TreeSelect;
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const UserInfoModal = ({ visible, onCreate, onCancel, userId }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!userId) {
      return
    }

    const getUserDetail = async () => {
      let getUserDetailResult = await userApi.getDetail(userId)
      if (getUserDetailResult.status)
        form.setFieldsValue(getUserDetailResult?.data?.user)
    }

    getUserDetail()
  })

  useEffect(() => {
    form.resetFields()
  }, [visible])

  const [value, setValue] = useState(['0-0-0']);

  const onChange = (newValue) => {
    console.log('onChange ', value);
    setValue(newValue);
  };

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  return (
    <Modal
      visible={visible}
      maskClosable={false}
      title="User information"
      width={530}
      okText={userId ? t('update') : t('add')}
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
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item label="Groups" name='group'
          rules={[
            // {
            //   required: true,
            //   message: 'Please input the password',
            // }
          ]}>
          <TreeSelect {...tProps} />
        </Form.Item>

        <Form.Item label="Roles" name='role'
          rules={[
            // {
            //   required: true,
            //   message: 'Please input the password',
            // }
          ]}>
          <TreeSelect {...tProps} />
        </Form.Item>

        <Form.Item label="Password" name='password'
          rules={[
            // {
            //   required: true,
            //   message: 'Please input the password',
            // }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm password"
          name='confirmPassword'
          rules={[
            // {
            //   required: true,
            //   message: 'Please input the confirm password',
            // },
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