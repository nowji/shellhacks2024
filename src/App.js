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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    
      <Router>
        <Navbar loggedIn={isAuthenticated} onLogout={handleLogout}/>
        <div className='App'>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/info"
            element={isAuthenticated ? <Info/> : <Navigate to="/info" />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;
