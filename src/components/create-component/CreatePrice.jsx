import React, { useContext, useState } from 'react'
import { HostContext } from '../../contexts/HostContext';

export default function CreatePrice() {
  const [price, setPrice] = useState('0');
  const [hotel,setHotel] = useContext(HostContext);
  const handleChange = (e) => {
    let val = e.target.value;
  
    if (!/^\d*$/.test(val)) return;
  
    if (val === "") {
      updatePrice("0");
    } else {
      const newPrice = hotel.price === "0" ? val.replace(/^0+/, '') : val;
      updatePrice(newPrice);
    }
  };
  
  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === 'Backspace' && hotel.price.length === 1) {
      updatePrice('0');
      e.preventDefault();
    }
  };
  
  const updatePrice = (val) => {
    setHotel(prev => ({
      ...prev,
      price: val
    }));
  };

  const numDigits = hotel.price?.toString().length || 1;
  const fontSize = hotel.price === '0' ? 100 : Math.max(20, Math.min(60 - numDigits * 2, 50));  

  return (
    <>
      <div className='price-content'>
        <div className="title">
          <h1>Now, set your price</h1>
          <p>You can change it anytime.</p>
        </div>
        <div className="price-wrapper">
          <div className="price-form">
            <span className="currency" style={{ fontSize: `${fontSize}px` }}>$</span>
            <input
              type="text"
              value={hotel.price}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              inputMode="numeric"
              pattern="[0-9]*"
              style={{ fontSize: `${fontSize}px`}}
            />
          </div>
        </div>
      </div>
    </>
  )
}
