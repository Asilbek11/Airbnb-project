import React, { useEffect, useState } from 'react'
import Cards from './Cards';

export default function CurrentTrips() {
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
    <div className="current-content">
        <div className="title">
            <h1>Current trips</h1>
        </div>
        <div className="card-trips current-container">
            <Cards data={data}/>
        </div>
    </div>
  )
}
