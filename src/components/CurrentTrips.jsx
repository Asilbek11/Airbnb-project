import React, { useContext, useEffect, useState } from 'react'
import Cards from './Cards';
import { UserContext } from '../contexts/UserContext';

export default function CurrentTrips() {
    const [data,setData] = useState([]);
    const [user,setUser] = useContext(UserContext);
    console.log(data);
    useEffect(()=>{
      fetch(`http://booking/api/hotels/get-trips?user_id=${user?.id}`)
      .then(res => res.json())
      .then(result => {
        setData(result.hotels.filter(item => item.status == 1));
      })
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
