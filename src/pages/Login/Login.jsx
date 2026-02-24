import React,{useState} from 'react'
import './Login.css'
import logo from '../../../netflix_react_assets/assets/Streamflix.ico'
import {login ,signup} from '../../Firebase'
const Login = () => {
  const [signState,setsignState]=useState("Sign In")
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const user_auth = async (e) => {
    e.preventDefault();
    if (signState === "Sign Up") {
      await signup(name, email, password);
    } else {
      await login(email, password);
    }
  }
  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form >
          {signState==="Sign Up" ? <input value={name} onChange={(e)=>{setName(e.target.value)}}
           type="text" placeholder='Your Name' />  : null }
          
          <input 
           value={email} onChange={(e)=>{setEmail(e.target.value)}}
           type="email" placeholder='Your Email' />
          <input   value={password} onChange={(e)=>{setPassword(e.target.value)}}
          type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>

            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In" ? <p>New to Streamflix?<span onClick={()=>{setsignState("Sign Up")}}>Sign Up Now</span></p>:<p>Already have account?<span onClick={()=>{setsignState("Sign In")}}>Sign In Now</span></p>}
          {/* <p>New to Streamflix?<span>Sign Up Now</span></p>
           <p>Already have account?<span>Sign In Now</span></p> */}
        </div>
      </div>
    </div>
  )
}

export default Login
