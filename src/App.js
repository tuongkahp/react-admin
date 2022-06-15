import './App.less';
import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import RequireAuth from 'components/RequireAuth';
import BaseLayout from 'components/BaseLayout';

// Lazy load - Code splitting
const Cart = React.lazy(() => import('features/cart'));
const Auth = React.lazy(() => import('features/auth'));
const User = React.lazy(() => import('features/user'));

function App() {
  return (
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

      <Route path="*" element={<Navigate to="users" />}
      />
    </Routes>
  );
}

export default App;
