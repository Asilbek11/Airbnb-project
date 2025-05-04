import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";


export default function CreateComponent() {
    const ref = useRef();
    useEffect(() => void setTimeout(() => ref.current?.play(), 500), []);
    return (
        <div className="video-content">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className='title'
            >
                    <p>Step 1</p>
                    <h1>Tell us about your place</h1>
                    <span>In this step, we'll ask you which type of property you have and if <br /> guests will book the entire place or just a room. Then let us know the <br /> location and how many guests can stay.</span>
            </motion.div>

            <div className="content">
                <video ref={ref} src="../vid.mp4" muted></video>
            </div>
        </div>
    )
}
