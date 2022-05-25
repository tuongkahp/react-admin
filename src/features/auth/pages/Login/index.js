import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.less';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  return (
    <div className='login'>
      <Form
        name="normal_login"
        className="login__form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item >
          <Row justify='space-between'>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to="">
              Forgot password
            </Link>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>Log in</Button>
        </Form.Item>

        <Form.Item>
          <Row justify='center'>Or login with</Row>
          <Button type="primary" htmlType="submit" className="login-form-button" block danger>Google</Button>
        </Form.Item>

        <Row justify='center'><Link to="/auth/register">Register now</Link></Row>
      </Form>
    </div>
  );
}

export default Login