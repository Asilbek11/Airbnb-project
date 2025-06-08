import React from 'react'
import Navbar from './Navbar'
import { FaCheck } from "react-icons/fa6";
export default function Profile() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className='profile-section'>
                <div className="profile">
                    <div className="profile-about">
                        <div className="profile-wrapper">
                            <div className="avatar">
                                F
                            </div>
                            <div className="name">
                                <span>Farhod</span>
                                <p>Guest</p>
                            </div>
                        </div>
                        <div className="profile-old">
                            <span>1</span> Year at airbnb
                        </div>
                    </div>
                    <div className="profile-verify">
                        <div className="profile-info">
                            <h2>Farhod's confirmed <br /> information</h2>
                            <div>
                                <FaCheck />
                                Email address
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
                <div className="create-profile">

                </div>
            </section>
        </>
    )
}
