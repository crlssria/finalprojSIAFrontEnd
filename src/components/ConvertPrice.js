// src/components/ConvertPrice.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Puff } from 'react-loader-spinner'; // Import the loader

const ConvertPrice = () => {
  const [metal, setMetal] = useState('XAU');
  const [currency, setCurrency] = useState('USD');
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/items/currencies')
      .then(response => {
        setAvailableCurrencies(response.data.currencies);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when starting the conversion
    axios.post('http://127.0.0.1:8000/items/convert', null, {
      params: {
        metal: metal,
        target_currency: currency
      }
    })
      .then(response => {
        setConvertedPrice(response.data.converted_price);
      })
      .catch(error => {
        console.error('Error converting price:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the conversion is complete
      });
  };

  return (
    <div>
      <h2>Convert Metal Price</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Metal:
          <select value={metal} onChange={(e) => setMetal(e.target.value)}>
            <option value="XAU">Gold (XAU)</option>
            <option value="XAG">Silver (XAG)</option>
            <option value="XPT">Platinum (XPT)</option>
            <option value="XPD">Palladium (XPD)</option>
          </select>
        </label>
        <label>
          Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {availableCurrencies.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </label>
        <button type="submit">Convert</button>
      </form>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Puff color="#00BFFF" height={100} width={100} />
        </div>
      )}
      {convertedPrice !== null && !loading && (
        <div>
          <h3>Converted Price</h3>
          <p>{convertedPrice} {currency}</p>
        </div>
      )}
    </div>
  );
};

export default ConvertPrice;
