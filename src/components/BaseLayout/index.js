import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { useState } from 'react';
import './style.less'
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <PieChartOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <PieChartOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const BaseLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Layout theme={theme} className='layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="layout__logo" />
        <Menu theme={theme} defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header theme={theme} changeTheme={changeTheme} />
        <Content className='layout__content' >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default BaseLayout;