import React, { useState } from 'react';
import {convertCurrency, supportedCurrencies} from '../services/currency-api'
import { Button } from 'react-bootstrap';

function CurrencyExchange() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState('');

    const handleConvert = () => {
        convertCurrency(setResult,amount,fromCurrency,toCurrency)
    }

  return (
    <div>
      <h2>Currency Exchange</h2>
      <div className="form-floating">
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="Amount"
            className="form-control" 
            id="floatingInputGrid"
        />
        <label htmlFor="floatingInputGrid">Amount</label>
      </div>
      <select className="form-select" id="floatingSelect" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
      {supportedCurrencies.map((currency) => (<option value="currency">{currency}</option>))}
      </select>
      <span> to </span>
      <select className="form-select" id="floatingSelect" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <Button onClick={handleConvert} variant="outline-light">Convert</Button>
      <p>{result}</p>
    </div>
  );
};

export default CurrencyExchange;
