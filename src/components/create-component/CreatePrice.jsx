import React, { useState } from 'react'

export default function CreatePrice() {
  const [price, setPrice] = useState('0');

  const handleChange = (e) => {
    let val = e.target.value;

    if (!/^\d*$/.test(val)) return;

    if (val === "") {
      setPrice("0");
    } else {
      // 0 bo‘lsa va boshqa raqam bosilgan bo‘lsa, almashtir
      setPrice(price === "0" ? val.replace(/^0+/, '') : val);
    }
  };

  const handleKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === 'Backspace' && price.length === 1) {
      setPrice('0');
      e.preventDefault();
    } 
  };

  const numDigits = price.toString().length;  // Qiymatdagi xonalar soni
  const fontSize = price === '0' ? 100 : Math.max(20, Math.min(60 - numDigits * 2, 50));

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
              value={price}
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
