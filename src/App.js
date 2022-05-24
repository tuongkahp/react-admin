// import logo from './logo.svg';
import './App.less';
// import 'antd/dist/antd.less'
import Cart from 'features/cart';
import { Button } from 'antd';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import NotFound from 'components/NotFound';
import Login from 'features/auth/pages/Login';
import Register from 'features/auth/pages/Register';
import Auth from 'features/auth';

// Lazy load - Code splitting
// const Auth = React.lazy(() => import('./features/auth'));

function App() {
  return (
    // <div className="App">
    //   <Cart />
    //   <Button type="primary">Button</Button>
    // </div>
    <>

      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="auth/*" element={<Auth />} />
      </Routes>

      {/* <div>
        <h1>Bookkeeper</h1>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/cart">cart</Link> |{" "}
          <Link to="/auth">auth</Link>
        </nav>
      </div> */}
    </>



    // <Suspense fallback={<div>Loading ...</div>}>
    //   <BrowserRouter>


    //     <Routes>
    //       <Route path="/cart" component={Cart} />
    //       <Route path="/auth" component={Auth} />

    //       <Route component={NotFound} />
    //     </Routes>
    //   </BrowserRouter>
    // </Suspense>
  );
}

export default App;
