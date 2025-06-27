import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { BeatLoader } from 'react-spinners';
import SwiperBtnNext from './SwiperBtnNext';

export default function Categorys() {
  const [data, setData] = useState([]);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    fetch("http://booking/api/hotels/get-categories")
      .then(res => res.json())
      .then(result => setData(result.hotels))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="category-list">
      {data.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          navigation
          slidesPerView="auto"
          loop={false}
          centeredSlides={false}
          watchSlidesProgress
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachEnd={() => setIsEnd(true)}
          onReachBeginning={() => setIsBeginning(true)}
          onFromEdge={() => {
            setIsBeginning(false);
            setIsEnd(false);
          }}
          className="category-swiper">

          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </SwiperSlide>

          ))}
          <SwiperBtnNext
            action={false}
            disabled={isBeginning}
            className='swiper-btn'
            children={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>} 
          />

          <SwiperBtnNext
            action={true}
            disabled={isEnd}
            className='swiper-btn'
            children={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>}
          />
          
        </Swiper>
      ) : (
        <div className='loading'>
          <BeatLoader />
        </div>
      )}
    </div>
  );
}
