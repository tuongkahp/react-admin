import { Breadcrumb, Button, Col, DatePicker, Input, Modal, Pagination, Row, Space, Table, Tag, Tooltip } from 'antd';
import { userApi } from 'apis/userApi';
import React, { useEffect, useState } from 'react';
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './style.less'
import UserInfoModal from 'features/user/components/UserInfoModal';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'utils/common'

const { confirm } = Modal;
const { RangePicker } = DatePicker;

const GroupPage = () => {
  const [visible, setVisible] = useState(false)
  const [userData, setUserData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });
  const [user, setUser] = useState({});
  const { t } = useTranslation();

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
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
      render: (_, { createdDate }) => (
        formatDate(createdDate)
      )
    }, {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        status ? <Tag color={'green'} key={status}>ACTIVED</Tag> : <Tag color={'red'} key={status}>DEACTIVED</Tag>
      )
    }, {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={t('edit')}>
            <a onClick={() => showUserInfoModal(record)}><EditOutlined /></a>
          </Tooltip>

          <Tooltip title={t('delete')}>
            <a onClick={() => showDeleteConfirm(record)}><DeleteOutlined /></a>
          </Tooltip>
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

  const showDeleteConfirm = () => {
    confirm({
      title: t('alertDeleteUser'),
      icon: <ExclamationCircleOutlined />,
      okText: t('yes'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        console.log('OK');
      },
    });
  };

  const handlePaginationChange = async (page, pageSize) => {
    setPagination({ ...pagination, page: page, pageSize: pageSize })
  };

  const getUser = async (page, pageSize) => {
    let getUserResult = await userApi.getAll({ page: page, count: pageSize })
    if (!getUserResult.status)
      return

    setUserData(getUserResult.data?.users)
    setPagination({ ...pagination, total: getUserResult.data?.total })
  }

  useEffect(() => {
    getUser(pagination.page, pagination.pageSize)
  }, [pagination.page, pagination.pageSize])

  return (
    <div className='user'>
      <Breadcrumb>
        <Breadcrumb.Item>{t('group')}</Breadcrumb.Item>
        <Breadcrumb.Item>{t('list')}</Breadcrumb.Item>
      </Breadcrumb>

      <div className='user__table-filter' align='end' >
        <Button type='primary' onClick={() => showUserInfoModal({})}>{t('addNewGroup')}</Button>
        {/* <Row justify="space-between">
          <Col> <Button type='primary' onClick={() => showUserInfoModal({})}>{t('addNewUser')}</Button></Col>
        </Row> */}
      </div>

      <div className='user__table-filter' align='end' >
        <Row justify="space-between">
          <Col><Space>{t('createdDate')}<RangePicker /></Space></Col>
          <Col><Space>{t('username')}<Input /></Space></Col>
          <Col><Button icon={<SearchOutlined />}> Search </Button></Col>
          {/* <Col span={6}> <Button type='primary' onClick={() => showUserInfoModal({})}>{t('addNewUser')}</Button></Col> */}
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={userData}
        rowKey={record => record.userId}
        pagination={false}
      />
      <Pagination className='user__pagination'
        current={pagination.page}
        total={pagination.total}
        pageSize={pagination.pageSize}
        onChange={handlePaginationChange}
      />
      <UserInfoModal
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        userId={user.userId} />
    </div >
  );
};

export default GroupPage;