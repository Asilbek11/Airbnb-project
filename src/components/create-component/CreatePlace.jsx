import React, { useEffect } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function CreatePlace() {
    const array = [
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        },
        {
            icon: <IoHomeOutline />,
            title: 'House'
        }
    ]
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
                {array.map((item, i) => (
                    <button data-aos="fade-up" data-aos-delay={i*100}  className='item' key={i}>
                        {item.icon}
                        <p>{item.title}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}
