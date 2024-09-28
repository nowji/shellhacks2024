import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'

function Navbar({ loggedIn, onLogout }) {
  //<button onClick={onLogout}>Logout</button>

    const navigate = useNavigate();

    const HandleNav = (path) => {
        navigate(path)
    };

    return(
      <div className="navbar">
        <div className="navbar-left">
          <h1><a className='logo' onClick={() => HandleNav('/home')}>Shellhacks 2024</a></h1>
        </div>
        <div className="navbar-right">
          { loggedIn && (<button className="navbar-button" onClick={onLogout}>Logout</button>)}
          <button className="navbar-button" onClick={!loggedIn ? () => HandleNav('/login') : () => HandleNav('/dashboard')}>{!loggedIn ? "Login/Register" : "Dashboard"}</button>
        </div>
      </div>
    
    );
    }

    export default Navbar;
    