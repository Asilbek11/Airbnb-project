import React, { useContext, useEffect, useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HostContext } from '../../contexts/HostContext';
export default function CreatePlace() {
    const [data, setData] = useState([]);
    const [category,setCategory] = useState(null);
    const [hotel,setHotel] = useContext(HostContext);
    useEffect(() => {
        fetch("http://booking/api/hotels/get-categories")
            .then(res => res.json())
            .then(result => setData(result.hotels))
            .catch(err => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            offset: -150
        });
    }, []);
    return (
        <div className='place-content'>
            <div className="title">
                <h1 data-aos="fade-in-up">Which of these best describes your place?</h1>
            </div>
            <div className="place-category">
                {data?.map((item, i) => (
                    <button
                        data-aos="fade-up" data-aos-delay={i * 100} 
                        className={`item aos-animate ${category == item.id ? "active" : ""}`} 
                        key={i}
                        onClick={() => {setCategory(item.id); setHotel({...hotel,category_id: item.id})}}
                    >
                        <img src={`.${item.image}`} alt="" />
                        <p>{item.title}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}
