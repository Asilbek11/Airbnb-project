import React from 'react'
import Navbar from './Navbar'
import Cards from './Cards'

export default function Wishlist({data}) {
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <section className='wishlist-body'>
        <div className="container sm">
          <div className="title">
            <h1>Wishlists</h1>
          </div>
        </div>
        <div className="container sm card-container">
          <Cards data={data}/> 
        </div>
      
    </section>
    </>
    
  )
}
