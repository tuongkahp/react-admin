import './App.less';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import NotFound from 'components/NotFound';
import RequireAuth from 'components/RequireAuth';
import BaseLayout from 'components/BaseLayout';

// Lazy load - Code splitting
const Cart = React.lazy(() => import('features/cart'));
const Auth = React.lazy(() => import('features/auth'));
const Home = React.lazy(() => import('features/home'));
const User = React.lazy(() => import('features/user'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cart />} />
      <Route path="auth/*" element={
        <React.Suspense fallback={<>...</>}>
          <Auth />
        </React.Suspense>
      } />
      <Route path="home/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="cart/*"
        element={
          <React.Suspense fallback={<>...</>}>
            <RequireAuth>
              <BaseLayout>
                <Cart />
              </BaseLayout>
            </RequireAuth>
          </React.Suspense>
        }>
      </Route>

      <Route path="users/*"
        element={
          <React.Suspense fallback={<>...</>}>
            <RequireAuth>
              <BaseLayout>
                <User />
              </BaseLayout>
            </RequireAuth>
          </React.Suspense>
        }>
      </Route>
      <Route component={NotFound} />
    </Routes>
  );
}

export default App;
