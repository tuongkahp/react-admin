import React from 'react';
import { Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
import { Routes } from 'react-router-dom';

const Login = React.lazy(() => import('features/auth/pages/Login'));
const Register = React.lazy(() => import('features/auth/pages/Register'));

const Auth = () => {
  return (
    <Routes>
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
    </Routes>
  );
}

export default Auth;