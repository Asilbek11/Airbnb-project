import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { Outlet } from 'react-router-dom'

export default function Home() {
  const [data, setData] = useState([]);
  const [finished,setFinished] = useState(true);
  useEffect(() => {
    setFinished(false);
    fetch("http://booking/api/hotels/get-hotels")
      .then(res => res.json())
      .then(result => {setData(result.hotels)})
      .catch(err => {
        console.log(err);
      }).finally(()=>{
        setFinished(true);
      })
  }, []);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className='items-body'>
        <div className="container card-container">
          <Cards data={data} finished={finished}/>
        </div>
      </section>
      <Outlet />
    </>
  )
}
