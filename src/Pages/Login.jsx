import React from 'react';
import './CSS/LoginSignup.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Log In</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Full Name' />
          {/* <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' /> */}
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Don't have an account? <Link to='/signup'><span>Create here</span></Link>
        </p>
        {/* <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
