import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleBeginAnalysis = () => {
        navigate('/Info');
    };

    return (
        <div>
          <h2>Welcome to your Dashboard</h2>
          <button onClick={onLogout}>Logout</button>
          <h4>No information to display yet</h4>
          <button onClick={handleBeginAnalysis}>Begin Analysis</button>
        </div>
      );
    }
    
    export default Dashboard;
    