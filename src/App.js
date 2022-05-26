import './App.less';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import NotFound from 'components/NotFound';
import RequireAuth from 'components/RequireAuth';

// Lazy load - Code splitting
const Cart = React.lazy(() => import('features/cart'));
const Auth = React.lazy(() => import('features/auth'));
const Home = React.lazy(() => import('features/home'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cart />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="home/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route component={NotFound} />
    </Routes>
  );
}

export default App;
