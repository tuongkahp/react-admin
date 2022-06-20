import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Dropdown, Layout, Menu, message, Row, Select, Space, Switch } from 'antd';
import './style.less'
import {
  ShoppingCartOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState } from 'recoils/themeState';
import ChangePasswordModal from 'components/ChangePasswordModal';
import i18n from 'i18n.js';
import { changeLanguage, t } from 'i18next';
import { authApi } from 'apis/authApi';

const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;

const siderMenuItems = [
  { key: '1', label: 'Users', path: '/users', icon: <UserOutlined /> },
  { key: '2', label: 'Groups', path: '/groups', icon: <UsergroupAddOutlined /> },
  { key: '3', label: 'Cart', path: '/cart', icon: <ShoppingCartOutlined /> }
]

const BaseLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useRecoilState(themeState)
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(siderMenuItems.find(_item => location.pathname.startsWith(_item.path)).key)
  const [visible, setVisible] = useState(false)

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
    localStorage.setItem('theme', value ? 'dark' : 'light')
  };

  const onClickHeaderMenu = (item) => {
    switch (item.key) {
      case '2': {
        showChangePasswordModal()
        break
      }
      case '3': {
        logout()
        break
      }
      default:
        break
    }
  }

  const handleChangeLanguage = (item) => {
    console.log('handleChangeLanguage: ', item.key);
    i18n.changeLanguage(item.key)
  }

  const showChangePasswordModal = () => {
    setVisible(true)
  }

  const handleChangePassword = async (values) => {
    console.log('Chaneg pass value: ', values);

    let changePasswordResult = await authApi.changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })

    if (!changePasswordResult?.status) {
      message.error(changePasswordResult?.description ?? 'Net work error')
      return;
    }

    message.success(changePasswordResult?.description)

    // Hide modal
    setVisible(false);
  };

  const onCancel = (e) => {
    setVisible(false);
  };

  const logout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('refreshToken', '')
    sessionStorage.setItem('token', '')
    sessionStorage.setItem('refreshToken', '')
    navigate('/auth/login')
  }

  const onClickSiderMenu = (item) => {
    const clicked = siderMenuItems.find(x => x.key === item.key)
    navigate(clicked.path)
  }

  useEffect(() => {
    setSelectedKey(siderMenuItems.find(_item => location.pathname.startsWith(_item.path)).key)
  }, [location])

  const languageMenu = (
    <Menu
      onClick={handleChangeLanguage}
      items={[
        {
          key: 'en',
          label: 'English',
          icon: <UserOutlined />
        }, {
          key: 'vi',
          label: 'Việt Nam',
          icon: <SettingOutlined />
        }
      ]}
    />
  )

  const headerMenu = (
    <Menu
      onClick={onClickHeaderMenu}
      items={[{
        key: '1',
        label: 'User Infomation',
        icon: <UserOutlined />,
        path: 'users'
      }, {
        key: '2',
        label: t('changePassword'),
        icon: <SettingOutlined />
      }, {
        key: '3',
        label: t('logout'),
        icon: <LogoutOutlined />
      }]}
    />
  )

  return (
    <Layout theme={theme} className='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="layout__logo" />
        <Menu theme={theme} mode="inline" items={siderMenuItems} selectedKeys={[selectedKey]} onClick={onClickSiderMenu} />
      </Sider>

      <Layout>
        <Header className='layout__header' theme={theme}>
          <ChangePasswordModal
            visible={visible}
            onCancel={onCancel}
            onOk={handleChangePassword}
          />

          <Row justify="space-between">
            <Col>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </Col>

            <Col>
              <Space size='large'>
                <Dropdown overlay={languageMenu}>
                  <Button className='layout__header__dropdown'>Language</Button>
                </Dropdown>

                <Dropdown overlay={headerMenu}>
                  <span className='layout__header__dropdown'>
                    <Avatar
                      icon={<UserOutlined />}
                      className='layout__header__avatar'
                      alt="avatar" />
                    <span>Timble Tran</span>
                  </span>
                </Dropdown>

                <Switch
                  className='layout__header__switch'
                  checked={theme === 'dark'}
                  onChange={(value) => changeTheme(value)}
                  checkedChildren={'🌜'}
                  unCheckedChildren={'🌞'}
                />
              </Space>
            </Col>
          </Row>
        </Header>
        <Content className='layout__content' >
          <Outlet />
        </Content>
        <Footer className='layout__footer'> Software ©2022 Created by Timber Tran </Footer>
      </Layout>
    </Layout >
  );
};

export default BaseLayout;