import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          {/* <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' /> */}
        </div>
        <button
          style={{
            opacity: isChecked ? 1 : 0.5,
            cursor: isChecked ? 'pointer' : 'not-allowed'
          }}
          disabled={!isChecked}
        >
          Continue
        </button>
        <p className="loginsignup-login">
          Already have an account? <Link to='/login'><span>Login here</span></Link>
        </p>
        <div className="loginsignup-agree">
          <input
            type="checkbox"
            name=''
            id=''
            onChange={handleCheckboxChange}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
