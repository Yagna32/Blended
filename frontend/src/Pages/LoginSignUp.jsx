import React, { useState } from 'react'
import './css/LoginSignup.css'
export const LoginSignUp = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async() =>{
    let responseData;

    await fetch('http://localhost:4000/api/v1/login',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>{responseData=data})

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.error);
    }
  }

  const signup = async()=>{
    let responseData;

    await fetch('http://localhost:4000/api/v1/signup',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>{responseData=data})

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors);
    }
  }


  return (
    <div className='loginsignup'> 
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"
          ?<input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder='Your Name' />
          :<></>}
          <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder='Email' />
          <input type="password" name="password" value={formData.password} onChange={changeHandler}  placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ?<p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p>
        :<p className='loginsignup-login'>Create an Account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
