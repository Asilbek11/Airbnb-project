import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'

export default function Wishlist() {
  const [data,setData] = useState([]);
  
    useEffect(()=>{
      fetch("http://booking/api/hotels/get-hotels")
      .then(res => res.json())
      .then(result => setData(result.hotels))
      .catch(err => {
        console.log(err);
      });
    },[]);
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <section className='wishlist-body'>
        <div className="container sm">
          <div className="title">
            <h1>My Hosts</h1>
          </div>
        </div>
        <div className="container sm card-container">
          <Cards data={data}/> 
        </div>
      
    </section>
    </>
    
  )
}