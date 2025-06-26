import React from 'react'
import { useSwiper } from 'swiper/react'
const SwiperBtnNext = ({action,children})=>{
    const swiper = useSwiper();

    const btn = action ? <button onClick={()=>{swiper.slideNext()}} className='swiper-btn'>{children}</button> : <button onClick={()=>swiper.slidePrev()} className='swiper-btn'>{children}</button>
    return btn;
}
export default SwiperBtnNext
