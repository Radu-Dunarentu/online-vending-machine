import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';

// todo: make them all strings
const keyPadInputs = [1,2,3,4,5,6,7,8,9,'C',0,'B'];
const App = ({products}) => {

  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  // todo: add text in variables
  const [info, setInfo] = useState('Please select a product by code');

  const handleKeyPad = (keypadInput) => {
    //todo: nice to have a limit
    if (keypadInput === 'C') {
      setInput('');
    } else if (keypadInput === 'B') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + keypadInput);
    }
    //clear error message
    if (error) {
      setError('')
    }
  };

  const buyProduct = () => {
    console.log('code is', input);
    const product = products.find(c => c.code === input);
    if (product) {
      console.log('try to buy product', product);
      // do a post request with the product id
    } else {
      setError('Code invalid');
      setInput('');
      setInfo('Enter code again');
    }
  };

  return(
    <div>
      <h1>Online Vending machine</h1>
      <div className='products-container'>
        {products.length && products.map(product => (
          <div key={product.id} className='product'>
              <div className='product-title'><b>{product.name}</b></div>
              <div>Quantity: {product.quantity}</div>
              <div>Price: {product.price}</div>
              <div>Code: <b>{product.code}</b></div>
              {/*<span>{product.name} A: {product.quantity} Price:{product.price} $</span> <span>Code: {product.code}</span>*/}
          </div>
        ))}
      </div>
      <h2>Keypad to select product</h2>
      <div className='keypad-container'>
        {keyPadInputs.map(input => (<span key={input} className='keypad-el' onClick={() => handleKeyPad(input)}>{input}</span>))}
      </div>
      <h3>Keypad Input</h3>
      <div>{input ? input : info}</div>
      <div><button onClick={buyProduct}>Select</button></div>
      {error && <div>{error}</div>}

      <style jsx>{`
      .products-container {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(5, 100px);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
      }
      .product {
        border: 1px solid lightgrey;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .product-title {
        font-size: 16px;
        margin-bottom: 4px;
        text-transform: uppercase;
      }
      .keypad-container {
        display: grid;
        grid-template-columns: repeat(3, 25px);
        grid-template-rows: repeat(4, 25px);
        grid-column-gap: 4px;
        grid-row-gap: 4px;
      }
        .keypad-el {
              cursor: pointer;
              width: 25px;
              height: 25px;
              background-color: lightblue;
              border: 1px solid black;
              margin-right: 4px;
              margin-bottom: 4px;
              display: flex;
              justify-content: center;
              align-items: center;
        }
      `}</style>
    </div>
  );
};

const productCodes = ['00', '01', '02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13', '14', '15','16'];
App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const {data} = await res.json();
  console.log('get products', data);
  return {
    products: data.map((a, index) => ({code: productCodes[index], ...a}))
  }
};

export default App;
