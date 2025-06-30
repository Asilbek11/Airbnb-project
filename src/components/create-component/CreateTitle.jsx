import React, { useContext, useEffect } from 'react';
import AOS from 'aos';
import { HostContext } from '../../contexts/HostContext';
export default function CreateTitle({ setIsValid }) {
  const [hotel, setHotel] = useContext(HostContext);
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: -150
    });
  }, []);
  useEffect(() => {
    if (setIsValid) {
      const isValid = hotel.title?.trim().length >= 10;
      setIsValid(!isValid);
    }
  }, [hotel.title, setIsValid]);

  return (
    <div className="description-content">
      <div className="title" data-aos="fade-up" data-aos-delay='500'>
        <h1>Now, let's give your apartment a title</h1>
        <p>Short titles work best. Have fun with it — you can always change it later.</p>
      </div>
      <div className="description-wrapper" data-aos="fade-up" data-aos-delay='700'>
        <div>
          <textarea
            cols="10"
            rows="5"
            value={hotel.title}
            onChange={(e) => setHotel({ ...hotel, title: e.target.value, name: e.target.value })}
            placeholder="Type at least 10 characters"
          ></textarea>
        </div>
      </div>
    </div>
  )
}
