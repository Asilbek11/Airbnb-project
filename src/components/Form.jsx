import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BeatLoader } from 'react-spinners';
import { UserContext } from '../contexts/UserContext';
import Error from './Error';

export default function Form({ fields }) {
    const [user, setUser] = useContext(UserContext);
    const buttonRef = useRef(null);
    const navigate = useNavigate(false);
    const location = useLocation();
    const verify = fields[0].verify;
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(location.pathname);
    const [error, setError] = useState();
    const errorTimerRef = useRef(null);
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
        if (btn) btn.addEventListener("mousemove", handleMouseMove);
        return () => {
            if (btn) btn.removeEventListener("mousemove", handleMouseMove);
        }
    }, []);

    const [formData, setFormData] = useState({ username: "", email: "", password: "", phone_number: "" });

    function registerLogin(e) {
        e.preventDefault();
        setLoading(true);
        if (page === "/register") {
            fetch("http://booking/api/user/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ...formData })
            })
                .then(res => {
                    if (res.ok) return res.json();
                    else throw res.json();
                })
                .then(() => {
                    setLoading(false);
                    navigate('/verify');
                })
                .catch(err => {
                    err.then(err => {
                        if (errorTimerRef.current) {
                            clearTimeout(errorTimerRef.current);
                        }
                        setError(err.error);
                        errorTimerRef.current = setTimeout(() => {
                            setError(null);
                            setLoading(false);
                        }, 50);
                    });
                });
        } else {
            fetch("http://booking/api/user/login", {
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
                    if (res.ok) return res.json();
                    else throw res.json();
                })
                .then(result => {
                    setLoading(false);
                    setUser(result.user_profile);
                    navigate('/');
                })
                .catch(err => {
                    err.then(err => {
                        if (errorTimerRef.current) {
                            clearTimeout(errorTimerRef.current);
                        }
                        setError(err.error);
                        errorTimerRef.current = setTimeout(() => {
                            setError(null);
                            setLoading(false);
                        }, 3000);
                    });
                });
        }
    }

    return (
        <>
            <Error error={error} />
            <form className='form'>
                <div className='form-head'>
                    <h1>Log in or sign up</h1>
                </div>
                <div className="form-body">
                    <h1>{verify ? 'Verify to login' : ''}</h1>
                    <div className="form-action">
                        {fields.map((field, id) => (
                            field.type === 'password' ?
                                <label htmlFor={id} key={field.name} className='password-box'>
                                    <span onClick={togglePassword}>
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </span>
                                    <input
                                        className={error ? 'error' : ''}
                                        type={showPassword ? "text" : field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        id={id}
                                        value={formData[field.name]}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    />
                                </label>
                                : <input
                                    className={error ? 'error' : ''}
                                    key={field.name}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    id={id}
                                    value={formData[field.name]}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                />
                        ))}
                    </div>
                </div>
                <div className="form-footer">
                    <div className="submit">
                        <button
                            onClick={registerLogin}
                            ref={buttonRef}
                            disabled={loading}
                            className={'submit-btn'}
                        >
                            {loading ? <BeatLoader size={8} color="#fff" /> : 'Continue'}
                        </button>
                    </div>
                    <div className='line-box'>
                        <div className='line'></div>
                        <p>or</p>
                    </div>
                    <div className="auth-forms">
                        <div className="auth-box">
                            <button className="button-auth" >
                                <FcGoogle />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                    <div className="privacy">
                        {page === '/register'
                            ? <p>Already have an account? <a onClick={navigateClick}>Log in</a> now!</p>
                            : <p>Don't have an account? <a onClick={navigateClick}>Register</a> now!</p>}
                    </div>
                </div>
            </form>
        </>
    )
}
