import React from 'react'
import fetch from 'isomorphic-unfetch';

const App = ({products}) => {
  return(
    <div>
      <h1>Online Vending machine</h1>
      <ul>
        {products.length && products.map(product => (
          <li key={product.id}>
              <span>{product.name} A: {product.quantity} Price:{product.price} $</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const {data: products} = await res.json();
  console.log('get products', products);
  return {
    products
  }
};

export default App;
