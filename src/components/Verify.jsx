import React from 'react'
import Navbar from './Navbar'

function Verify() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section>
        <div className="container form-container">
          <h1 style={{marginTop: "100px"}}>Verify your email</h1>
        </div>
      </section>
    </>
  )
}

export default Verify
