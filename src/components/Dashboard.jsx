import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const userId = localStorage.getItem('userID');
            const response = await fetch(`http://localhost:8000/info/${userId}`);
            const data = await response.json();
            setData(data);
        };
        loadData();
    }, []);

    console.log(localStorage.getItem('userID'));
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleBeginAnalysis = () => {
        navigate('/Info');
    };

    return (
        <div className='dashboard-container'>
          <h2>Welcome to your Dashboard</h2>
          <h4>No information to display yet</h4>
          <button className='begin-analysis-button' onClick={handleBeginAnalysis}>Begin Analysis</button>
        </div>
      );
    }

    export default Dashboard;
