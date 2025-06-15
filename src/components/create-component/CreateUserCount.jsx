import React, { useContext, useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { HostContext } from '../../contexts/HostContext';
export default function CreateUserCount() {
  const [count, setCount] = useState({guest:1, bedrooms:1, beds: 1, bathrooms: 1});
  const [hotel,setHotel] = useContext(HostContext);
  return (
    <div className='user-count-content'>
        <div className="title">
            <h1>Share some basics about your place</h1>
            <p>You'll add more details later, like bed types.</p>
        </div>
        <div className="user-count-wrapper">
            <motion.div data-aos="fade-up" data-aos-delay={1000} className="user-count-bar">
                <div className="user-type">
                    <span>Guests</span>
                </div>
                <div className="count-bar">
                    <button 
                    onClick={() => {
                        setCount({...count, guest:count.guest-1});
                        setHotel({...hotel,persons: count.guest-1});
                    }} disabled={count.guest <= 1}><FaMinus /></button>
                    <span>{count.guest}</span>
                    <button onClick={() => {
                        setCount({...count, guest:count.guest+1});
                        setHotel({...hotel,persons: count.guest+1});
                    }}><FaPlus /></button>
                </div>
            </motion.div>
            <motion.div data-aos="fade-up" data-aos-delay={1200} className="user-count-bar">
                <div className="user-type">
                    <span>Bedrooms</span>
                </div>
                <div className="count-bar">
                    <button onClick={() => {
                        setCount({...count, bedrooms:count.bedrooms-1});
                        setHotel({...hotel,bedrooms: count.bedrooms-1});
                    }} disabled={count.bedrooms < 1}><FaMinus /></button>
                    <span>{count.bedrooms}</span>
                    <button onClick={() => {
                        setCount({...count, bedrooms:count.bedrooms+1});
                        setHotel({...hotel,bedrooms: count.bedrooms+1});
                    }}><FaPlus /></button>
                </div>
            </motion.div>
            <motion.div data-aos="fade-up" data-aos-delay={1400} className="user-count-bar">
                <div className="user-type">
                    <span>Beds</span>
                </div>
                <div className="count-bar">
                    <button onClick={() => {
                        setCount({...count, beds:count.beds-1});
                        setHotel({...hotel,beds: count.beds-1});
                    }} disabled={count.beds <= 1}><FaMinus /></button>
                    <span>{count.beds}</span>
                    <button onClick={() => {
                        setCount({...count, beds:count.beds+1});
                        setHotel({...hotel,beds: count.beds+1});
                    }}><FaPlus /></button>
                </div>
            </motion.div>
            <motion.div data-aos="fade-up" data-aos-delay={1600} className="user-count-bar">
                <div className="user-type">
                    <span>Bathrooms</span>
                </div>
                <div className="count-bar">
                    <button onClick={() => {
                        setCount({...count, bathrooms:count.bathrooms-1});
                        setHotel({...hotel,bathrooms: count.bathrooms-1});
                    }} disabled={count.bathrooms <= 1}><FaMinus /></button>
                    <span>{count.bathrooms}</span>
                    <button onClick={() => {
                        setCount({...count, bathrooms: count.bathrooms+1});
                        setHotel({...hotel,bathrooms: count.bathrooms+1});
                    }}><FaPlus /></button>
                </div>
            </motion.div>
        </div>
    </div>
  )
}
