import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './style.less';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { sleep } from 'utils/common';
import { Spin } from 'antd';
import { useSetRecoilState } from 'recoil';
import { authState } from 'features/auth/authState';
import { authApi } from 'apis/authApi';

const Login = () => {
  const [form] = Form.useForm();
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const onFinish = async (values) => {
    var loginResult = await authApi.login({
      username: values.username,
      password: values.password
    })

    if (!loginResult?.status) {
      message.error(loginResult?.description ?? 'Net work error')
      return;
    }

    message.success(loginResult?.description)
    setAuth(loginResult?.data)

    if (values.remember) {
      localStorage.setItem('token', loginResult.data.token)
      localStorage.setItem('refreshToken', loginResult.data.refreshToken)
    } else {
      sessionStorage.setItem('token', loginResult.data.token)
      sessionStorage.setItem('refreshToken', loginResult.data.refreshToken)
    }

    navigate(from, { replace: true });
  };

  return (
    <div className='login'>
      <Form
        form={form}
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
          <Input
            prefix={<UserOutlined />}
            placeholder="Username" />
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
          <Input.Password
            prefix={<LockOutlined />}
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
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            {/* {<Spin />} */}
            Log in
          </Button>
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