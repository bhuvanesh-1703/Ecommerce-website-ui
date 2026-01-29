import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../css/signin.css'
import { authContext } from '../App';
import Swal from 'sweetalert2'

const SignIn = () => {
    const navigate = useNavigate();

    const { setUserData } = useContext(authContext);

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const [localStore, setLocalStore] = useState('')
    const [localhost, setLocalHost] = useState('')

    const localhosts = async () => {
        const response = await axios.post('http://localhost:5100')
        console.log(response.data);
        setLocalHost(localStorage.getItem('token'))
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5100/auth/login", input);
            console.log(response.data);

            Swal.fire({
                title: "Good job!",
                text: " login successfully!",
                icon: "success",
                confirmButtonColor: "#56021F"
            });

            setUserData(JSON.stringify(response.data.data.userData));
            localStorage.setItem("userId", JSON.stringify(response.data.data.userData));
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
            navigate('/')

            setInput({ email: "", password: "" });
        } catch (error) {
            Swal.fire({
                title: "No user found Please SignIn",
                icon: "error",
                draggable: true,
                confirmButtonColor: "#d40c0cff"
            });

            console.log(error);
        }
    };

    const [errMsg, setErrMsg] = useState(null)



    // useEffect(() => {
    //     try {
    //         const localStore = localStorage.getItem("userId", users.username);
    //         if (localStore) {
    //             setLocalStore(JSON.parse(localStore));
    //         }
    //     } catch (error) {
    //         console.error("Failed", error);
    //     }
    // }, []);


    return (
        <div className='containers' style={{ width: "400px", marginTop: "5%", marginBottom: "3%" }}>
            <form onSubmit={handleSignIn}>
                <h1 style={{ textAlign: 'center' }}>
                    Sign In
                </h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="sub">Submit</button>

                <p style={{ textAlign: "center", marginTop: "20px" }}>
                    I Have No Account?{" "}
                    <span
                        className='spanss'
                        onClick={() => navigate("/register")}
                        style={{ color: "blue", cursor: 'pointer' }}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignIn;


