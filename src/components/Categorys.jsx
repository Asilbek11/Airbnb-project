import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function Categorys() {
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetch("http://booking/api/hotels/get-categories")
    .then(res => res.json())
    .then(result => setData(result.hotels))
    .catch(err => {
      console.log(err);
    });
  },[]);

  return (
        <div className='category-list'>
          <div className='list'>
            {data.length > 0 ?
              data.map((item,i)=>(
                <div className="list-item" key={item.id} onClick={()=>{}}>
                  <img src={item.image} alt="" />
                  <span>{item.title}</span>
                </div>
              ))
            :
            <BeatLoader style={{textAlign:'center'}}/>}
          </div>
        </div>
  )
}
