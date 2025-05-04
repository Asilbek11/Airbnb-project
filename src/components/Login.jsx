import Form from './Form'
import Navbar from './Navbar'
export default function Login() {
  const fields = [
    { name: "email", type: "email", required: true, placeholder: "Email" },
    { name: "password", type: "password", required: true, placeholder: "Password" }
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
        {/* <form action="#" className="form">
            <div className='form-head'>
                <h1>Log in or sign up</h1>
            </div>
            <div className="form-body">
                <h1>Welcome to Airbnb</h1>
                <div className="form-action">
                    <input type="text" placeholder='Username'  />
                    <label for='password' className='password-box'>
                      <span onClick={togglePassword}> {showPassword ? }</span>
                      <input  type={showPassword ? "text" : "password"} placeholder='Password' id='password'/>
                    </label>
                    
                    
                </div>
            </div>
            <div className="form-footer">
                <div className="submit">
                    <input type="submit" value='Continue' ref={buttonRef} />
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
                    <p>Don't have an account?  <a onClick={()=>handleClick('/register')}>Register</a> now!</p>
                </div>
            </div>
          </form> */}
      </section>
    </>
  )
}

