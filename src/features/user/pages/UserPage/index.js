import { Breadcrumb, Button, Modal, Space, Table, Tag } from 'antd';
import axiosClient from 'apis/axiosClient';
import { userApi } from 'apis/userApi';
import React, { useEffect, useState } from 'react';
import {
  ExclamationCircleOutlined
} from '@ant-design/icons';
import './style.less'
import UserInfoModal from 'features/user/components/UserInfoModal';

const { confirm, success } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this user?',
    icon: <ExclamationCircleOutlined />,
    //content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
  });
};

const UserPage = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  // let user = {}

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      // render: (text) => <a>{text}</a>,
    }, {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      // render: (text) => <a>{text}</a>,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    }, {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    }, {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    }, {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        status ? <Tag color={'green'} key={status}>ACTIVED</Tag> : <Tag color={'red'} key={status}>DEACTIVED</Tag>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showUserInfoModal(record)}>Edit</a>
          <a onClick={showDeleteConfirm}>Delete</a>
        </Space>
      ),
    },
  ];

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  const onCancel = (e) => {
    setVisible(false);
  };

  const showUserInfoModal = (userInfo) => {
    setUser(userInfo)
    setVisible(true)
  }

  useEffect(() => {
    const getUser = async () => {
      let getUserResult = await userApi.getAll({ page: 1, count: 10 })
      if (getUserResult.status)
        setUsers(getUserResult.data?.users)
    }

    getUser()
  }, [])

  return (
    <div className='user'>
      <Breadcrumb>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
      <div className='user__table-filter' align='end' >
        <Button type='primary' onClick={() => showUserInfoModal({})}>Add new user</Button>
      </div>
      <Table columns={columns} dataSource={users} rowKey='userId' />
      <UserInfoModal
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        userId={user.userId} />
    </div>
  );
};

export default UserPage;