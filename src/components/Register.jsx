import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Form from './Form';
export default function Register() {
    // const buttonRef = useRef(null);
    // const navigate = useNavigate();
    // const handleClick = (title)=>{
    //     navigate(title)
    // }
    // useEffect(() => {
    //     const handleMouseMove = (e) => {
    //         const rect = buttonRef.current.getBoundingClientRect();
    //         const x = ((e.clientX - rect.left) / rect.width) * 100;
    //         const y = ((e.clientY - rect.top) / rect.height) * 100;

    //         buttonRef.current.style.setProperty('--mouse-x', x);
    //         buttonRef.current.style.setProperty('--mouse-y', y);
    //     };

    //     const btn = buttonRef.current;
    //     btn.addEventListener("mousemove", handleMouseMove);

    //     return () => {
    //         btn.removeEventListener("mousemove", handleMouseMove);
    //     };
    // }, []);
    const fields = [
        { name: "name", type: "text", required: true, placeholder: "Name" },
        { name: "email",  type: "email", required: true, placeholder: "Email" },
        { name: "password",  type: "password", required: true, placeholder: "Password" },
        { name: "number",  type: "number", required: true, placeholder: "Phone number" }
      ];
    
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section>
                <div className="container form-container">
                    <Form fields={fields}/>
                </div>
            </section>
        </>

    )
}
