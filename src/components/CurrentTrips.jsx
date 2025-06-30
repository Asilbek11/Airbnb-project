import React, { useContext, useEffect, useState } from 'react'
import Cards from './Cards';
import { UserContext } from '../contexts/UserContext';

export default function CurrentTrips() {
    const [data,setData] = useState([]);
    const [user,setUser] = useContext(UserContext);
    const [finished,setFinished] = useState(true);
    useEffect(()=>{
      setFinished(false);
      fetch(`http://booking/api/hotels/get-trips?user_id=${user?.id}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        
        setData(result.hotels.filter(item => item.booking.active == 1));
      })
      .catch(err => {
        console.log(err);
      }).finally(()=>{
        setFinished(true);
      })
    },[]);
  return (
    <div className="current-content">
        <div className="title">
            <h1>Current trips</h1>
        </div>
        <div className="card-trips current-container">
            <Cards data={data} finished={finished}/>
        </div>
    </div>
  )
}
