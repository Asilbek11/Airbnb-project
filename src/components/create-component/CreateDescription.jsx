import React, { useContext } from 'react'
import { HostContext } from '../../contexts/HostContext';
export default function CreateDescription() {
  const [hotel,setHotel] = useContext(HostContext);
  return (
    <div className="description-content">
        <div className="title" data-aos="fade-up" data-aos-delay='500'>
            <h1>Now, let's give your apartment a title</h1>
            <p>Short titles work best. Have fun with it—you can always change it later.</p>
        </div>
        <div className="description-wrapper" data-aos="fade-up" data-aos-delay='700'>
            <input type="text" onChange={(e) => setHotel({...hotel,name: e.target.value})} />
            <div>
                <textarea cols="10" rows="5"  onChange={(e) => setHotel({...hotel,description: e.target.value})}></textarea>
            </div>
        </div>
    </div>
  )
}
