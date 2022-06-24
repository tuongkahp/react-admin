import './App.less';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import RequireAuth from 'components/RequireAuth';
import BaseLayout from 'components/BaseLayout';
import { ConfigProvider } from 'antd';
import { localeState } from 'recoils/localeState';
import { useRecoilValue } from 'recoil';

// Lazy load - Code splitting
const Cart = React.lazy(() => import('features/cart'));
const Auth = React.lazy(() => import('features/auth'));
const User = React.lazy(() => import('features/user'));

function App() {
  const locale = useRecoilValue(localeState)
  return (
    <ConfigProvider locale={locale}>
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route element={
          <RequireAuth>
            <BaseLayout />
          </RequireAuth>
        }>
          <Route path="cart/*" element={<Cart />}></Route>
          <Route path="users/*" element={<User />}></Route>
          <Route path="groups/*" element={<User />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="users" />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
