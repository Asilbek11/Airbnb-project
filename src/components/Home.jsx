import React from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
import { Outlet, Route } from 'react-router-dom'
import Categorys from './Categorys'

export default function Home({cat_data,data}) {
  return (
    <>
      <header>
        <Navbar cat_data={cat_data}/>
      </header>
      <section className='items-body'>
        <div className="container card-container">
          <Cards data={data}/>
        </div>
      </section>
      <Outlet/>
    </>
    )
}
