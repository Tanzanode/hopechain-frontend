import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { registerUser } from '../ic/ic-service';
import { Link, useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const validateName = (name) => {
    // Check if the name is not empty and contains only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return name.trim().length > 0 && nameRegex.test(name);
  };

  const handleSubmit = async () => {
    if (!validateName(name)) {
      setError('Please enter a valid full name (letters only).');
      return;
    }

    try {
      const user = await registerUser(name);
      if (user) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
      } else {
        setError('User already exists. Please log in.');
      }
    } catch (error) {
      setError('An error occurred while registering the user.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input 
            type="text" 
            placeholder='Your Full Name' 
            value={name}
            onChange={handleInputChange}
          />
          {/* Add more inputs as needed, e.g., email, password */}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            opacity: isChecked ? 1 : 0.5,
            cursor: isChecked ? 'pointer' : 'not-allowed'
          }}
          disabled={!isChecked}
        >
          Continue
        </button>
        {error && <p className="loginsignup-error">{error}</p>}
        {success && <p className="loginsignup-success">{success}</p>}
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
          By continuing, I agree to the terms of use & 
          <Link to="/PrivacyPolicy" style={{ textDecoration: 'underline' }}>Privacy Policy. </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
