import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaCheck } from "react-icons/fa6";
import History from './History';
import CurrentTrips from './CurrentTrips';
import { UserContext } from '../contexts/UserContext';
export default function Profile() {
    let [isFixed, setIsFixed] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [data,setData] = useState([]);
    useEffect(()=>{
      fetch(`http://booking/api/user/get-user?user_id=${user?.id}`)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setData(result);
      })
      .catch(err => {
        console.log(err);
      });
    },[user]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 275) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className='profile-section'>
                <div className='profile'>
                    <div className="profile-about">
                        <div className="profile-wrapper">
                            <div className="avatar">
                                F
                            </div>
                            <div className="name" style={{textAlign: "center"}}>
                                <span>{data?.profile?.username}</span>
                                <p>Guest</p>
                            </div>
                        </div>
                        <div className="profile-old">
                            <span>1</span> Year at airbnb
                        </div>
                    </div>
                    <div className={`profile-verify ${isFixed ? 'fixed' : ''}`}>
                        <div className="profile-info">
                            <h2>Farhod's confirmed <br /> information</h2>
                            <div>
                                <FaCheck />
                                Email
                            </div>
                            <div>
                                <FaCheck />
                                Phone number
                            </div>
                        </div>
                        <div className="profile-identify">
                            <h2>Verify your identity</h2>
                            <span>Before you book or host on Airbnb, you’ll <br /> need to complete this step.</span>
                            <button>Get verified</button>
                        </div>

                    </div>
                </div>
                <div className="profile-hosts">
                    <div className="card-section profile-current">
                        <CurrentTrips />
                    </div>
                    <div className="line"></div>
                    <div className="card-section profile-history">
                        <History />
                    </div>
                </div>
            </section>
        </>
    )
}
