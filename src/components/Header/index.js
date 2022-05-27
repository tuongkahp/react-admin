import React from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Space, Switch } from 'antd'
import './style.less'
import { useNavigate } from 'react-router-dom'



const Header = ({ theme, changeTheme }) => {
  const navigate = useNavigate()
  const handleChangeTheme = (value) => {
    if (changeTheme) changeTheme(value)
  }

  const handleMenuClick = e => {
    switch (e.key) {
      case '3': {
        localStorage.setItem('token', '')
        localStorage.setItem('refreshToken', '')
        sessionStorage.setItem('token', '')
        sessionStorage.setItem('refreshToken', '')
        navigate('/auth/login')
        break
      }
      default:
        break
    }
  }

  const menu = (
    <Menu
      onClick={handleMenuClick}
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
  )

  return (
    <Space className='header'>
      <Dropdown overlay={menu}>
        <span className='header__dropdown'>
          Notification
        </span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottomRight">
        <span className='header__dropdown'>
          Language
        </span>
      </Dropdown>

      <Dropdown overlay={menu} placement="bottomRight">
        <span className='header__dropdown'>
          <Avatar
            className='header__avatar'
            alt="avatar" />
          <span>Timble Tran</span>
        </span>
      </Dropdown>

      <Switch
        checked={theme === 'dark'}
        onChange={(value) => handleChangeTheme(value)}
        checkedChildren={'🌜'}
        unCheckedChildren={'🌞'}
      />
    </Space>
  );
}

export default Header