import React from 'react';

export default function Categorys({data}) {
  return (
    <section>
      <div className="container">
        <div className='category-list'>
          <div className='list'>
            {data.length >0 ?
              data.map((item,i)=>(
                <div className="list-item" key={item.id} onClick={()=>{}}>
                  <img src={item.image} alt="" />
                  <span>{item.title}</span>
                </div>
              ))
            :
            <h1>LOADING. . .</h1>}
          </div>
        </div>
      </div>
    </section>
  )
}
