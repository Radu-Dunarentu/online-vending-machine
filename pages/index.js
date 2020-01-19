import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';

// todo: make them all strings
const keyPadInputs = [1,2,3,4,5,6,7,8,9,'C',0,'B'];
const App = ({products}) => {

  const [input, setInput] = useState('');
  const [keypadInput, setKeyPadInput] = useState('');

  const handleKeyPad = (keypadInput) => {
    //todo: nice to have a limit
    if (keypadInput === 'C') {
      setInput('');
    } else if (keypadInput === 'B') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + keypadInput);
    }
  };

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
      <h2>Keypad to select product</h2>
      <div className='keypad-container'>
        {keyPadInputs.map(input => (<span key={input} className='keypad-el' onClick={() => handleKeyPad(input)}>{input}</span>))}
      </div>
      <h3>Keypad Input</h3>
      <div>{input ? input: 'Please select a product by code'}</div>

      <style jsx>{`
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

App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const {data: products} = await res.json();
  console.log('get products', products);
  return {
    products
  }
};

export default App;
