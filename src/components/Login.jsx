import { useEffect } from 'react';
import Form from './Form'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
export default function Login() {
  const fields = [
    { name: "email", type: "email", required: true, placeholder: "Email" },
    { name: "password", type: "password", required: true, placeholder: "Password" }
  ];
  const {key} = useParams();
  useEffect(()=>{
    if(key != 0){
      fetch("http://booking/api/user/verify",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          verification_token: key
        })
    }).then(res => res.json())
    .then(result => console.log(result))
    }
  },[]);
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

