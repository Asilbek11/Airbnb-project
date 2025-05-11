import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { Outlet, Route } from 'react-router-dom'
import Categorys from './Categorys'

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://booking/api/hotels/get-hotels")
      .then(res => res.json())
      .then(result => {setData(result.hotels); console.log(result.hotels);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className='items-body'>
        <div className="container card-container">
          <Cards data={data}/>
          <h1 style={{margin:'400px'}}>erfergerg</h1>
        </div>
      </section>
      <Outlet />
    </>
  )
}
