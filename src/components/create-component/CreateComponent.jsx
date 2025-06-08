import React, { useEffect, useRef } from 'react'
import { motion } from "framer-motion";


export default function CreateComponent({ fields }) {
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
                <p>{fields.step}</p>
                <h1>{fields.title}</h1>
                <span>{fields.description}</span>
            </motion.div>

            <div className="content">
                <video ref={ref} src={fields.videoUrl} muted></video>
            </div>
        </div>
    )
}
