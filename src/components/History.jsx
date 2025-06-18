import React, { useEffect, useState } from 'react'
import Cards from './Cards'

export default function History() {
    const [data,setData] = useState([]);
  
    useEffect(()=>{
      fetch("http://booking/api/hotels/get-hotels?limit=5")
      .then(res => res.json())
      .then(result => setData(result.hotels))
      .catch(err => {
        console.log(err);
      });
    },[]);
  return (
    <div className="history-content">
        <div className="title">
            <h1>Past trips</h1>
        </div>
        <div className="card-trips history-container">
            <Cards data={data}/>
        </div>
    </div>
  )
}
