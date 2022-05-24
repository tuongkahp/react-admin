import { Button } from 'antd';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addToCart, cartState } from '../../cartState';
import { productListState } from '../../productState';

ProductList.propTypes = {};

function ProductList() {
  const productList = useRecoilValue(productListState);
  const [cart, setCart] = useRecoilState(cartState);

  const handleAddToCart = (product) => {
    const newCart = addToCart(cart, product);
    setCart(newCart);
  }

  return (
    <div>
      <h2>Product List</h2>

      <ul className="product-list">
        {productList.map(product => (
          <li key={product.id}>
            {product.title} - {product.price}

            <Button
              type="primary"
              style={{ marginLeft: '1rem', marginBottom: '1rem' }}
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;