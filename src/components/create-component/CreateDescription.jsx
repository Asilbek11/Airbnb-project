import React, { useContext } from 'react'
import { HostContext } from '../../contexts/HostContext';
export default function CreateDescription() {
  const [hotel,setHotel] = useContext(HostContext);
  return (
    <div className="description-content">
        <div className="title" data-aos="fade-up" data-aos-delay='500'>
            <h1>Create your description</h1>
            <p>Share what makes your place special.</p>
        </div>
        <div className="description-wrapper" data-aos="fade-up" data-aos-delay='700'>
            <input type="text" onChange={(e) => setHotel({...hotel,name: e.target.value})} />
            <div>
<<<<<<< HEAD
                <textarea cols="10" rows="5"  onChange={(e) => setHotel({...hotel,description: e.target.value})}></textarea>
=======
                <textarea cols="10" rows="5" value="You'll have a great time at this comfortable place to stay."></textarea>
>>>>>>> 6724343addcea8f797e32ed1d21ef1b8baca2ca2
            </div>
        </div>
    </div>
  )
}
