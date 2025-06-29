import React, { useContext } from 'react'
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperBtnNext from './SwiperBtnNext';
import { WishlistContext } from '../contexts/WishlistContext';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
function Cards({ data }) {
  console.log("Cards: ",data);
  
  const [wishlist, setWishlist] = useContext(WishlistContext);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (item) => {
    if(!user){
      alert("Login to add this hostel to your wishlist.");
      return;
    }

    if (wishlist?.find(element => element.id == item.id)) {
      fetch("http://booking/api/hotels/delete-wishlist", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user_id: user.id, hotel_id: item.id })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw res.json();
          }
        })
        .then(result => setWishlist(wishlist?.filter(element => element.id !== item.id)))
        .catch(err => {
          err.then(err => alert(err.error))
        });
    } else {
      fetch("http://booking/api/hotels/add-wishlist", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ user_id: user.id, hotel_id: item.id })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw res.json();
          }
        })
        .then(result => setWishlist([...wishlist, item]))
        .catch(err => {
          err.then(err => alert(err.error))
        });
    }
  };
  return (
    <>
      {data?.length > 0 ? data.map((item, index) => (
        <div  className="item-wrp" key={item?.id}>
          <div className="item">
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
                {item?.images?.map((item) => (
                  <SwiperSlide className='item-img' key={item?.id}><a><img src={item?.url} key={item?.id} /></a></SwiperSlide>
                ))}
                <div className="swiper-nav">
                  <SwiperBtnNext action={false} children={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path></svg>} />
                  <SwiperBtnNext action={true} children={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path></svg>} />
                </div>
              </Swiper>
              <svg className='like-btn' onClick={(e) => { e.stopPropagation(); handleClick(item) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: wishlist?.find(element => element?.id == item?.id) ? 'var(--main-red)' : 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
            </div>
            <a className="item-body" style={{ color: 'black' }} onClick={() => navigate(`/rooms/${item?.id}`)}>
              <h4>{item?.address?.slice(0, 30)}...</h4>
              <div style={{ marginBottom: '10px' }}>
                {/* <p>{item.type}</p> */}
                <p>apr 3-7</p>
              </div>
              <span><strong>${item?.price}</strong> night</span>
            </a>
          </div>
        </div>
      )) : <div className="loader"><HashLoader size={80} /></div>}
    </>
  )

}
export default Cards;