import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Info from './components/Info';
import Navbar from './components/Navbar';
import Home from './components/Home';

import './App.css';

function App() {
  const [userID, setUserID] = useState(() => localStorage.getItem('userID') || null);


  const handleLogin = (id) => {
    localStorage.setItem('userID', id);
    setUserID(id);
  };

  const handleLogout = () => {
    setUserID(null);
  };

  return (
    
      <Router>
        <Navbar loggedIn={userID} onLogout={handleLogout}/>
        <div className='App'>
        <Routes>
          <Route
            path="/login"
            element={userID  ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={userID  ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={userID  ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/info"
            element={userID  ? <Info/> : <Navigate to="/info" />}
          />
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;
