import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordDuplicate, setPasswordDuplicate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email && firstName  && lastName && (password === passwordDuplicate)) {
            const collectData = async () => {
                const result = await fetch("http://localhost:8000/register", {
                    method: "POST",
                    body: JSON.stringify( { email, password, firstName, lastName }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                const data = await result.json();
                console.warn(data);
            }
            collectData();

            navigate('/login');
        }
        else {
            alert("Passwords Don't Match");
        }
    };

    return (
        <div className='auth-container'>
            <h2>Register</h2>
            <form className='register-form' onSubmit={handleSubmit}>
            <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            </div>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={passwordDuplicate}
                onChange={(e) => setPasswordDuplicate(e.target.value)}
                placeholder="Re-enter Password"
            />
            <button type="submit">Register</button>
            <p>Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
    }

    export default Register;
