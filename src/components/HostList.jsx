import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { UserContext } from '../contexts/UserContext';

export default function Wishlist() {
  const [user,setUser] = useContext(UserContext);
  const [data,setData] = useState([]);
  const [finished,setFinished] = useState(true);
    useEffect(()=>{
      fetch(`http://booking/api/hotels/get-own-hotels?user_id=${user?.id}`)
      .then(res => res.json())
      .then(result => setData(result.hotels))
      .catch(err => {
        console.log(err);
      }).finally(()=>{
        setFinished(true);
      })
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
          <Cards data={data} finished={finished}/>
        </div>
    </section>
    </>
    
  )
}