import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, Space, Spin, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './style.less'

const menu = (
  <Menu
    items={[{
      key: '1',
      label: 'User Infomation',
      icon: <UserOutlined />
    }, {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />
    }, {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />
    }]}
  />
);

const Header = ({ theme, changeTheme }) => {
  const handleChangeTheme = (value) => {
    if (changeTheme) changeTheme(value)
  }

  return (
    <Space className='header'>
      <Dropdown overlay={menu}>
        <span className='header__dropdown'>
          Notification
        </span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottomRight">
        <span className='header__dropdown'>
          {/* <Avatar
            // src={currentUser.avatar}
            alt="avatar" />
          <span>Admin</span> */}
          Language
        </span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottomRight">
        <span className='header__dropdown'>
          <Avatar
            className='header__avatar'
            // src={currentUser.avatar}
            alt="avatar" />
          <span>Timble Tran</span>
        </span>
      </Dropdown>

      <Switch
        checked={theme === 'dark'}
        onChange={(value) => handleChangeTheme(value)}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
      />
    </Space>
  );
};

const loginOut = async () => {
  window.location.pathname = '/auth/login'

  // await outLogin();
  // const { query = {}, pathname } = history.location;
  // const { redirect } = query; // Note: There may be security issues, please note

  // if (window.location.pathname !== '/user/login' && !redirect) {
  //   history.replace({
  //     pathname: '/user/login',
  //     search: stringify({
  //       redirect: pathname,
  //     }),
  //   });
  // }


};

export default Header;