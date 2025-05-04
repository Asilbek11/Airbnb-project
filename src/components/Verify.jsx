import React from 'react'
import Form from './Form'
import Navbar from './Navbar'

export default function Verify() {
  const fields = [
    { name: "verifyCode", type: "number", required: true, placeholder: "Verification code", verify : true }
  ];
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>
        <div className="container form-container">
          <Form fields={fields} />
          
        </div>
      </section>
    </>
  )
}
