import { useState } from 'react';
import {convertCurrency, supportedCurrencies} from '../services/currency-api'
import { Alert, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import MoneyPng from '../images/image.jpg';

function CurrencyExchange() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState('');

    const handleConvert = () => {
        convertCurrency(setResult,amount,fromCurrency,toCurrency)
    }

  return (
    <PagePosition>
      <Header>Currency Exchange</Header>
      <DesignedCard>
        <Card.Body>
          <InputDiv className="form-floating">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                placeholder="Amount"
                className="form-control" 
                id="floatingInputGrid"
            />
            <label htmlFor="floatingInputGrid">Amount</label>
          </InputDiv>
          <InputDiv className="form-floating">
            <select className="form-select" id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {supportedCurrencies.map((currency) => (<option value={currency} key={currency}>{currency}</option>))}
            </select>
            <label htmlFor="fromCurrency">From</label>
          </InputDiv>
          <InputDiv className="form-floating">
            <select className="form-select" id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {supportedCurrencies.map((currency) => (<option value={currency} key={currency}>{currency}</option>))}
            </select>
            <label htmlFor="toCurrency">To</label>
          </InputDiv>
          <InputDiv>
            <Alert key="result" variant="success" show={result != ""} onClose={() => setResult("")} dismissible>{result}</Alert>
          </InputDiv>
          <InputDiv>
            <Button onClick={handleConvert} variant="dark">Convert</Button>
          </InputDiv>
        </Card.Body>
      </DesignedCard>
    </PagePosition>
  );
};

export default CurrencyExchange;


const DesignedCard = styled(Card)`
  width: 40em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${MoneyPng});
`
const PagePosition = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
`
const InputDiv = styled.div`
  width: 20em;
  margin-top: 2em;
`
const Header = styled.h2`
    font-family: Assistant;
    font-size: 2em;
`