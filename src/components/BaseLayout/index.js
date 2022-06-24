import React, { useEffect, useState } from 'react';
import { Avatar, Button, Calendar, Col, ConfigProvider, Dropdown, Layout, Menu, message, Radio, Row, Select, Space, Switch } from 'antd';
import './style.less'
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { themeState } from 'recoils/themeState';
import ChangePasswordModal from 'components/ChangePasswordModal';
import { changeLanguage, t } from 'i18next';
import { authApi } from 'apis/authApi';
import { authState } from 'recoils/authState';
import moment from 'moment';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
// import { getRecoil, setRecoil } from 'recoil-nexus';
import { localeState } from 'recoils/localeState';
import { I18N_LANGUAGE } from 'utils/constant';

const { Header, Sider, Content, Footer } = Layout;

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
  const setAuth = useSetRecoilState(authState)
  const [locale, setLocale] = useRecoilState(localeState)

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
    console.log('handleChangeLanguage', item)
    setLocale(item.key === I18N_LANGUAGE.EN.key ? enUS : viVN)
    changeLanguage(item.key)
  }

  const showChangePasswordModal = () => {
    setVisible(true)
  }

  const handleChangePassword = async (values) => {
    console.log('Chaneg pass value: ', values);

    authApi.changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })

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
    setAuth(null)
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
          key: I18N_LANGUAGE.EN.key,
          label: I18N_LANGUAGE.EN.title,
          icon: <UserOutlined />
        }, {
          key: I18N_LANGUAGE.VN.key,
          label: I18N_LANGUAGE.VN.title,
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

  // const [locale, setLocal] = useState(enUS);

  const changeLocale = (e) => {
    const localeValue = e.target.value;
    changeLanguage(localeValue.locale)
    setLocale(localeValue);
    // setRecoil( localeValue)

    if (!localeValue) {
      moment.locale('en');
    } else {
      moment.locale('vi');
    }
  };

  return (
    // <ConfigProvider locale={getRecoil(localeState)}>
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
                <Radio.Group value={locale} onChange={changeLocale}>
                  <Radio.Button key="en" value={enUS}>
                    English
                  </Radio.Button>
                  <Radio.Button key="vi" value={viVN}>
                    Việt Nam
                  </Radio.Button>
                </Radio.Group>

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
        <Footer className='layout__footer'> Software ©2022 Created by Timber Tech </Footer>
      </Layout>
    </Layout >
    // </ConfigProvider>
  );
};

export default BaseLayout;