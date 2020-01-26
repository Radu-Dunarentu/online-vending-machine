import React from 'react';
import {TEXTS} from './texts';
/* lazy loaded component */
const ProductList = ({products}) => products.map(product => (
  <div key={product.id} className='card product'>
    <div className='product-title'><b>{product.name}</b></div>
    <div>{TEXTS.quantity}: {product.quantity}</div>
    <div>{TEXTS.price}: {product.price}</div>
    <div>{TEXTS.code}: <b>{product.code}</b></div>
    <style jsx>{`
    .product {
        border: 1px solid lightgrey;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .card {
          border-radius: 10px;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.25), -1px -1px 1px 1px rgba(0,0,0,0.22);
          cursor: pointer;
        }
      .product-title {
        font-size: 14px;
        margin-bottom: 4px;
        text-transform: uppercase;
      }
    `}</style>
  </div>
));

export default ProductList;
