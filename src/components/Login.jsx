import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.warn("Here");
        const collectData = async () => {
            const result = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: JSON.stringify( { email, password }),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const data = await result.json();
            console.warn(data);
        }
        collectData();

        /*if (email === 'a@a' && password === 'a') {
            onLogin();
            navigate('/dashboard');
        }
        else {
            alert("Email or Password incorrect");
        }*/

        //navigate("/dashboard");
    };

    return (
        <div className='auth-container'>
            <h2>Login</h2>
            <form className='login-form' onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register">Register here</a></p>
            </form>
        </div>
    );
    }

    export default Login;
