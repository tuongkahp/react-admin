import { Breadcrumb } from 'antd';
import React from 'react';
import CartInfo from './components/CartInfo';
import ProductList from './components/ProductList';

Cart.propTypes = {};

function Cart() {
  return (
    <div>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>
      <ProductList />
      <CartInfo />
    </div>
  );
}

export default Cart;