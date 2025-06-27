import React from 'react';
import { useSwiper } from 'swiper/react';

const SwiperBtnNext = ({ action = true, children, className = '', disabled = false }) => {
  const swiper = useSwiper();

  const handleClick = () => {
    if (disabled) return;
    action ? swiper.slideNext() : swiper.slidePrev();
  };

  return (
    <button
      onClick={handleClick}
      className={`swiper-btn ${action ? 'next' : 'prev'} ${disabled ? 'disabled' : ''} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SwiperBtnNext;
