import React, { useContext, useEffect } from 'react'
import { HostContext } from '../../contexts/HostContext';
export default function CreateDescription({setIsValid}) {
  const [hotel,setHotel] = useContext(HostContext);
  useEffect(() => {
    if (setIsValid) {
      const isValid = hotel.description?.trim().length >= 20;
      setIsValid(!isValid);
    }
  }, [hotel.description, setIsValid]);

  return (
    <div className="description-content">
        <div className="title" data-aos="fade-up" data-aos-delay='500'>
            <h1>Create your description</h1>
            <p>Share what makes your place special.</p>
        </div>
        <div className="description-wrapper" data-aos="fade-up" data-aos-delay='700'>
            <div>
                <textarea cols="10" rows="5" value={hotel.description} onChange={(e) => setHotel({...hotel,description: e.target.value})}></textarea>
            </div>
        </div>
    </div>
  )
}
