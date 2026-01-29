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

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


   
    const handleSignUp = async (e) => {
        e.preventDefault();
      
        const { username, email, phonenumber, password, confirmpassword } = input;


        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonenumberRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


        if (!username || !email || !phonenumber || !password || !confirmpassword) {
            setErrMsg('All fields are required');
            return;
        }
        if (!emailRegex.test(email)) {
            setErrMsg('Enter a valid email');
            return;
        }
        if (!phonenumberRegex.test(phonenumber)) {
            setErrMsg('Enter 10 Numbers');
            return;
        }
        if (!passwordRegex.test(password)) {
            setErrMsg('Password must be at least 8 characters, with uppercase, lowercase, number & special char');
            return;
        }
        if (password !== confirmpassword) {
            setErrMsg('Passwords do not match');
            return;
        }

        setErrMsg('');

        try {
            const response = await axios.post('http://localhost:5100/auth/register', {
                username,
                email,
                phonenumber,
                password,
                confirmpassword
            });

            if (response.data.success) {
                alert("Registered Successfully");
                setInput({
                    username: "",
                    email: "",
                    phonenumber: "",
                    password: "",
                    confirmpassword: ""
                });
                navigate("/login");
            }
        } catch (error) {
                setErrMsg(error.response.data.message);
          
        }
    };

    return (
        <div className='containers'>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <input type="text" placeholder='Name' name='username' value={input.username} onChange={handleChange} />
                <input type="email" placeholder='Email' name='email' value={input.email} onChange={handleChange} />
                <input type="number" placeholder='Phone Number' name='phonenumber' value={input.phonenumber} onChange={handleChange} />
                <input type="password" placeholder='Password' name='password' value={input.password} onChange={handleChange} />
                <input type="password" placeholder='Confirm Password' name='confirmpassword' value={input.confirmpassword} onChange={handleChange} />
                <button type="submit">Submit</button>

                {errMsg && <p style={{ color: "red",textAlign:"center"}}>{errMsg}</p>}
            </form>
            <p style={{ textAlign: "center", marginTop: "20px" }}>
                Already have an account?{" "}
                <span
                    className='spanss'
                    onClick={() => navigate("/login")}
                    style={{ color: "blue", cursor: 'pointer' }}
                >
                    Login
                </span>
            </p>
        </div>
    );
};

export default SignUp;
