import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../css/signin.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: ""
  });

  const [errMsg, setErrMsg] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setAlertMsg('');

    const { username, email, phonenumber, password, confirmpassword } = input;

    // Regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonenumberRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation
    if (!username) {
      setErrMsg("Username is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrMsg("Invalid email format");
      return;
    }
    if (!phonenumberRegex.test(phonenumber)) {
      setErrMsg("Phone number must be 10 digits");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrMsg("Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long");
      return;
    }
    if (password !== confirmpassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    
    try {
      const response = await axios.post('/api/signup', {
        username,
        email,
        phonenumber,
        password
      });

      setAlertMsg("Signup successful!");
      navigate('/dashboard');
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form">
        <h2>Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={input.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          value={input.phonenumber}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChange}
        />
     
        <p className="password-hint" style={{color:"green"}}>
          Password must be at least 8 characters, include uppercase, lowercase, number, and special character.
        </p>

        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={input.confirmpassword}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>

        {errMsg && <p className="error">{errMsg}</p>}
        {alertMsg && <p className="success">{alertMsg}</p>}
      </form>
    </div>
  );
};

export default SignUp;
