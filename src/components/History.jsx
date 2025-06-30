import React, { useContext, useEffect, useState } from 'react'
import Cards from './Cards'
import { UserContext } from '../contexts/UserContext';

export default function History() {
  const [user,setUser] = useContext(UserContext);
  const [data, setData] = useState([]);
  const [finished,setFinished] = useState(true);
  useEffect(() => {
    setFinished(false);
    fetch(`http://booking/api/hotels/get-trips?user_id=${user?.id}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result.hotels.filter(item => item.booking.active == 0))
      })
      .catch(err => {
        console.log(err);
      }).finally(()=>{
        setFinished(true);
      });
  }, []);
  return (
    <div className="history-content">
      <div className="title">
        <h1>Past trips</h1>
      </div>
      <div className="card-trips history-container">
        <Cards data={data} finished={finished}/>
      </div>
    </div>
  )
}
