import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { UserContext } from '../contexts/UserContext';
export default function Form({ fields }) {
    const [user,setUser] = useContext(UserContext);
    const buttonRef = useRef(null);
    const navigate = useNavigate(false);
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [page, setPage] = useState(location.pathname);
    const togglePassword = () => {
        setShowPassword((prev) => !prev)
    }
    const navigateClick = () => {
        if (location.pathname === '/register') {
            navigate('/login/0');
            setPage('login');
        } else {
            navigate('/register');
            setPage('register');
        }
    }
    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            buttonRef.current.style.setProperty('--mouse-x', x);
            buttonRef.current.style.setProperty('--mouse-y', y);
        };

        const btn = buttonRef.current;
        btn.addEventListener("mousemove", handleMouseMove);
        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);
    const [formData, setFormData] = useState({ username: "", email: "", password: "", phone_number: "" });
    function registerLogin(e) {
        e.preventDefault();
        if(page == "/register"){
            fetch("http://booking/api/user/register",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({...formData})
            }).then(res => {
                if(res.ok){
                    return res.json();
                }else{
                    throw res.json();
                }
            })
            .then(result => navigate('/verify'))
            .catch(err => {
                err.then(err => alert(err.error))
            });
        }else{
            fetch("http://booking/api/user/login",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.email,
                    password: formData.password
                }) 
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }else{
                    throw res.json();
                }
            })
            .then(result => {
                setUser(result.user_profile);
                navigate('/');
            })
            .catch(err => {
                err.then(err => alert(err.error))
            });
        }
    }
    return (
        <>
            <form action="#" className="form">
                <div className='form-head'>
                    <h1>Log in or sign up</h1>
                </div>
                <div className="form-body">
                    <h1>Welcome to Airbnb</h1>
                    <div className="form-action">
                        {fields.map((field, id) => (
                            field.type === 'password' ?
                                <>
                                    <label htmlFor={id} key={field.name} className='password-box'>
                                        {field.type === "password" && (
                                            <span onClick={togglePassword}>
                                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </span>
                                        )}
                                        <input
                                            type={
                                                field.type === "password" && showPassword
                                                    ? "text"
                                                    : field.type
                                            }
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            id={id}
                                            value={formData[field.name]}
                                            onChange={(e) => {
                                                let newObj = { ...formData };
                                                newObj[field.name] = e.target.value;
                                                setFormData(newObj);
                                            }}
                                        />
                                    </label>
                                </> : <>
                                    <input
                                        type={
                                            field.type === "password" && showPassword
                                                ? "text"
                                                : field.type
                                        }
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        id={id}
                                        value={formData[field.name]}
                                        onChange={(e) => {
                                            let newObj = { ...formData };
                                            newObj[field.name] = e.target.value;
                                            setFormData(newObj);
                                        }}
                                    />
                                </>
                        ))}
                    </div>
                </div>
                <div className="form-footer">
                    <div className="submit">
                        <input type="submit" onClick={(e) => registerLogin(e)} value='Continue' ref={buttonRef} />
                    </div>
                    <div className='line-box'>
                        <div className='line'></div>
                        <p>or</p>
                    </div>
                    <div className="auth-forms">
                        <div className="auth-box">
                            <button className="button-auth">
                                <FcGoogle />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                    <div className="privacy">
                        {page == '/register'
                            ? <p>Already have an account? <a onClick={navigateClick}>Log in</a> now!</p>
                            : <p>Don't have an account? <a onClick={navigateClick}>Register</a> now!</p>}
                    </div>
                </div>
            </form>
        </>

    )
}
