import React, { useState } from 'react'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperBtnNext from './SwiperBtnNext';

function Cards({data}) {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const handleClick = (index) => {
    if (activeIndexes.includes(index)) {
      setActiveIndexes(activeIndexes.filter((i) => i !== index));
    } else {
      setActiveIndexes([...activeIndexes, index]);
    }
  };
  return (
    <>
      {data?.length > 0 ? data.map((item, index) => (
        <div className="item-wrp">
          <div className="item" key={item.id}>
            <div className='item-dad'>
              <Swiper
                style={{
                  "--swiper-pagination-color": "var(--main-hover)",
                  "--swiper-pagination-bullet-inactive-color": "var(--pagination)",
                  "--swiper-pagination-bullet-inactive-opacity": "0.6",
                  "--swiper-pagination-bullet-horizontal-gap": "3px"
                }}
                modules={[Pagination, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true, dynamicBullets: true, }}
              >
                {item.images.map((item) => (
                  <SwiperSlide className='item-img'><a href='#'><img src={item.url} key={item.id} /></a></SwiperSlide>
                ))}
                <div className="swiper-nav">
                  <SwiperBtnNext action={false} children={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>} />
                  <SwiperBtnNext action={true} children={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>} />
                </div>
              </Swiper>
              <svg className='like-btn' onClick={() => { handleClick(index) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: activeIndexes.includes(index) ? 'var(--main-red)' : 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
            </div>
            <a href='#' className="item-body" style={{ color: 'black' }}>
              <h4>{item.address.slice(0, 30)}...</h4>
              <div style={{ marginBottom: '10px' }}>
                {/* <p>{item.type}</p> */}
                <p>apr 3-7</p>
              </div>
              <span><strong>${item.price}</strong> night</span>
            </a>
          </div>
        </div>
      )) : <h1>Hozircha bo'sh</h1>}
    </>
  )

}
export default Cards;