import React from 'react'
import Navbar from './Navbar'

export default function Rooms() {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <section className='rooms'>
                <div className="container room-container sm">
                    <div className="title">
                        <h2>Grandfather's cosy cabin by riverbank</h2>
                    </div>
                    <div className="img-wrapper">

                    </div>
                </div>
            </section>
        </>
    )
}
