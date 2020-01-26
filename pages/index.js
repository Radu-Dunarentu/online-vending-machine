import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';
import {TEXTS} from '../components/texts';
import {SkeletonLine} from '../components/Skeleton';
import ProductList from "../components/productList";

// TODO: create more components
const keyPadInputs = ['1','2','3','4','5','6','7','8','9','C','0','B'];
const productCodes = ['00', '01', '02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12','13', '14', '15','16', '17', '18', '19'];
const mapCodesToProducts = (a, index) => ({code: productCodes[index], ...a});
const coins = [1,3,5,10,20];
const App = () => {

  const [products, setProducts] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState(TEXTS.selectProduct);
  const [balance, setBalance] = useState(0);
  const [buyingLoading, setBuyingLoading] = useState(false);

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

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/products');
      const data = await res.json();
      setProducts(data.map(mapCodesToProducts));
    })();
  }, []);

  const resetInput = () => {
    setInput('');
  };

  const buyProduct = async () => {
    const product = products.find(c => c.code === input);
    if (product) {
      if(balance > product.price) {
        try {
          setBuyingLoading(true);
          const res = await fetch(`http://localhost:3000/api/products/${product._id}`, { method: 'PATCH'});
          const data = await res.json();
          setProducts(data.map(mapCodesToProducts));
          setBalance(balance - product.price);
        } catch(e) {
          setError(e.error);
        }
      } else {
        setError(TEXTS.notEnoughMoney);
      }
    } else {
      setError(TEXTS.codeInvalid);
      setInfo(TEXTS.enterCodeAgain);
    }
    resetInput();
    setBuyingLoading(false);
  };

  return(
    <div className='container'>
      <div>
      <h1>{TEXTS.mainTitle}</h1>
      <div className='products-container'>
        {products.length ? <ProductList products={products} />
        : (productCodes.map(() => <SkeletonLine width={400} height={500}/>))}
      </div>
        </div>
      <div>
        <h2>{TEXTS.keypadTitle}</h2>
        <div className='keypad-container'>
          {keyPadInputs.map(input => (<span key={input} className='keypad-el' onClick={() => handleKeyPad(input)}>{input}</span>))}
        </div>
        <h3>{TEXTS.keypadInput}</h3>
        <div>{input ? input : info}</div>
        <div>{buyingLoading ? <SkeletonLine height='4px'/> :<button onClick={buyProduct}>{TEXTS.select}</button> }</div>
        {error && <div>{error}</div>}
        <div>{TEXTS.balance}: {balance ? balance : TEXTS.noBalance}</div>
        <div style={{display: 'flex', alignItems: 'baseline'}}>{TEXTS.insertMoney} {coins.map(c => (<span key={c} className='coin' onClick={() => setBalance(balance + c)}>{c}</span>))} </div>
      </div>

      <style jsx>{`
      
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
      }
      .coin {
        cursor: pointer;
        background-color: gold;
        border: solid black;
        border-radius: 69px;
        width: 19px;
        margin: 2px;
        padding: 2px;
        display: flex;
        justify-content: center;
      }
      .products-container {
        display: grid;
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(5, 100px);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
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


/*App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  return {
    products: data.map(mapCodesToProducts)
  }
};*/


export default App;
