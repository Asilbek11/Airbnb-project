import React, { useContext } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { WishlistContext } from '../contexts/WishlistContext';

export default function Wishlist() {
  const [data,setData] = useContext(WishlistContext);
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
